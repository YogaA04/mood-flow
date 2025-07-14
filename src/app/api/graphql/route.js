import { createYoga, createSchema } from 'graphql-yoga';
import { prisma } from '@/libs/prisma';
import { verifySession } from '@/libs/dal';

const typeDefs = /* GraphQL */ `
    type Query {
        routines: [Routine!]!
        moodBoxes: [MoodBox!]!
        myDayRoutines(isChecked: Boolean, date: String): [MyDayRoutine!]!
    }
    type Mutation {
        createRoutine(
            title: String!
            category: String!
            mood: String!
        ): Routine!
        createMyDay(
            routineId: String!
            date: String!
            description: String
        ): MyDayRoutine!
        checkMyDayRoutine(
            id: String!
        ): MyDayRoutine!
    }
    type Routine {
        id: ID!
        title: String!
        category: String!
        createdAt: String!
        updatedAt: String!
        moodBox: MoodBox!
    }
    type MoodBox {
        id: ID!
        mood: String!
    }
    type MyDayRoutine {
        id: ID!
        routineId: String!
        userId: String!
        date: String!
        description: String
        isChecked: Boolean!
        checkedAt: String
        createdAt: String!
        routine: Routine!
    }
`;

const resolvers = {
    Query: {
        routines: async (_, __, context) => {
            const { userId } = await verifySession();
            return await prisma.routine.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include: { moodBox: true },
            });
        },
        moodBoxes: async (_, __, context) => {
            const { userId } = await verifySession();
            return await prisma.moodBox.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });
        },
        myDayRoutines: async (_, args, context) => {
            const { userId } = await verifySession();
            const where = { userId };
            if (typeof args.isChecked === 'boolean') {
                where.isChecked = args.isChecked;
            }
            if (args.date) {
                // Filter tanggal (format: YYYY-MM-DD)
                where.date = {
                    gte: new Date(args.date + "T00:00:00.000Z"),
                    lt: new Date(args.date + "T23:59:59.999Z"),
                };
            }
            return await prisma.myDayRoutine.findMany({
                where,
                orderBy: { date: 'desc' },
                include: { routine: { include: { moodBox: true } } },
            });
        },
    },
    Mutation: {
        createRoutine: async (_, args, context) => {
            const { userId } = await verifySession();
            const { title, category, mood, } = args;
            if (!title || !category || !mood) {
                throw new Error('Field wajib tidak boleh kosong.');
            }
            let moodBox = await prisma.moodBox.findFirst({ where: { userId, mood } });
            if (!moodBox) {
                moodBox = await prisma.moodBox.create({ data: { mood, userId } });
            }
            const routine = await prisma.routine.create({
                data: {
                    title,
                    category,
                    userId,
                    moodBoxId: moodBox.id,
                },
                include: { moodBox: true },
            });
            return routine;
        },
        createMyDay: async (_, args, context) => {
            const { userId } = await verifySession();
            const { routineId, date, description } = args;
            if (!routineId || !date) {
                throw new Error('routineId dan date wajib diisi.');
            }
            const myDayRoutine = await prisma.myDayRoutine.create({
                data: {
                    routineId,
                    userId,
                    date: new Date(date),
                    description,
                },
            });
            return myDayRoutine;
        },
        checkMyDayRoutine: async (_, args, context) => {
            const { userId } = await verifySession();
            const { id } = args;
            // Pastikan hanya user yang bersangkutan bisa update
            const updated = await prisma.myDayRoutine.updateMany({
                where: { id, userId },
                data: {
                    isChecked: true,
                    checkedAt: new Date(),
                },
            });
            // Ambil data terbaru
            const myDayRoutine = await prisma.myDayRoutine.findUnique({ where: { id } });
            return myDayRoutine;
        },
    },
    Routine: {
        moodBox: (parent) => parent.moodBox,
    },
};

const yoga = createYoga({
    schema: createSchema({ typeDefs, resolvers }),
    graphqlEndpoint: '/api/graphql',
});

export { yoga as GET, yoga as POST };
