import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { verifySession } from '@/libs/dal';

// GET: Ambil semua rutinitas milik user yang sedang login
export async function GET() {
    try {
        const { userId } = await verifySession();
        const routines = await prisma.routine.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                moodBox: {
                    select: { mood: true }
                }
            }
        });

        // Gabungkan mood ke setiap routine
        const routinesWithMood = routines.map(routine => ({
            ...routine,
            mood: routine.moodBox?.mood || null
        }));

        return NextResponse.json({ routines: routinesWithMood });
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized or failed to fetch routines.' }, { status: 401 });
    }
}

// POST: Buat rutinitas baru untuk user yang sedang login
export async function POST(request) {
    try {
        const { userId } = await verifySession();
        const body = await request.json();
        const { title, description, category, mood, timeBlock, weeklyFocusId } = body;

        if (!title || !category || !mood || !timeBlock) {
            return NextResponse.json({ error: 'Field wajib tidak boleh kosong.' }, { status: 400 });
        }

        // Cari MoodBox
        let moodBox = await prisma.moodBox.findFirst({
            where: { userId, mood },
        });

        // Buat MoodBox jika belum ada
        if (!moodBox) {
            moodBox = await prisma.moodBox.create({
                data: { mood, userId },
            });
        }

        // Buat Routine
        const routine = await prisma.routine.create({
            data: {
                title,
                description,
                category,
                timeBlock,
                userId,
                moodBoxId: moodBox.id,
                weeklyFocusId: weeklyFocusId || null,
            },
        });

        return NextResponse.json({ routine }, { status: 201 });
    } catch (error) {
        console.error('POST /api/rutinitas error:', error); // Tambahkan log ini
        return NextResponse.json({ error: 'Gagal membuat rutinitas.' }, { status: 500 });
    }
}