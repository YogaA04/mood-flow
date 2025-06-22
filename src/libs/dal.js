import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from '@/libs/session';
import { redirect } from 'next/navigation';
import { prisma } from '@/libs/prisma';
import { cache } from 'react';

export const verifySession = cache(async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session')?.value;
    const session = await decrypt(cookie);

    if (!session) {
        redirect('/login');
    }

    return { isAuth: true, userId: session.userId };
})

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });


        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
});