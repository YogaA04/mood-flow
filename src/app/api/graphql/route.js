import { createYoga, createSchema } from 'graphql-yoga';
import { prisma } from '@/libs/prisma';
import { verifySession } from '@/libs/dal';

const typeDefs = /* GraphQL */ `
    type Query {
        routines: [Routine!]!
        moodBoxes: [MoodBox!]!
    }
    type Mutation {
        createRoutine(
            title: String!
            category: String!
            mood: String!
        ): Routine!
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
    },
    Mutation: {
        createRoutine: async (_, args, context) => {
            const { userId } = await verifySession();
            const { title, category, mood, } = args;
            if (!title || !category || !mood ) {
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
