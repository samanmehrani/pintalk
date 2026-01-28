import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Specify protected and public routes
const publicRoutes = [
    '/',
    '/auth',
    '/public',
    '/contactus',
    '/favicon.ico',
    '/manifest.json',
]

export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const isPublicRoute =
        publicRoutes.includes(path) || path.startsWith('/products/')

    const token = (await cookies()).get('session')?.value

    if (!isPublicRoute && (token !== 'true')) {
        const redirectUrl = new URL('/auth', req.nextUrl)
        redirectUrl.searchParams.set('callbackPath', encodeURI(path))
        return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}