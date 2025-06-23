import { verifySession } from "@/libs/dal";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await verifySession();
        const moodBoxes = await prisma.moodBox.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                routines: true, // pastikan nama relasi sesuai dengan model Prisma Anda
            },
        });
        return NextResponse.json({ moodBoxes });
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized or failed to fetch mood boxes.' }, { status: 401 });
    }
}