import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const publicRoutes = [
    "/",
    "/api",
    "/auth",
    "/public",
    "/contactus",
    "/favicon.ico",
    "/manifest.json",
]

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname

    const isPublicRoute = publicRoutes.includes(path) || path.startsWith("/products/")

    if (isPublicRoute) {
        return NextResponse.next()
    }

    const token =
        req.cookies.get("access_token")?.value ||
        req.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
        const redirectUrl = new URL("/auth", req.nextUrl)
        redirectUrl.searchParams.set("callbackPath", encodeURIComponent(path))
        return NextResponse.redirect(redirectUrl)
    }

    try {
        jwt.verify(token, process.env.JWT_PRIVATE_KEY!)
        return NextResponse.next()
    } catch (err) {
        const redirectUrl = new URL("/auth", req.nextUrl)
        redirectUrl.searchParams.set("callbackPath", encodeURIComponent(path))
        return NextResponse.redirect(redirectUrl)
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}