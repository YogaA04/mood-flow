import { NextResponse } from "next/server";
import { decrypt } from "@/libs/session";
import { cookies } from "next/headers";

// speify protection and public routes
const protectedRoutes = [
    '/dashboard',
    '/profile',
];
const publicRoutes = [
    '/',
    '/login',
    '/register',
];

export default async function middleware(request) {
    //check if the current route is protected or public
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    //decrypt the session cookie
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session')?.value;
    const session = await decrypt(cookie);

    // redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // redirect to /dashboard if the user is authenticated and trying to access public routes
    if (
        isPublicRoute &&
        session?.userId &&
        !request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

//route middleware
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};
