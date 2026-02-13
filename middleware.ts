import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const publicRoutes = [
    "/",
    "/auth",
    "/contactus",
    "/manifest.json",
]

export default function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname

    const isPublicRoute =
        publicRoutes.some(route => path.startsWith(route)) ||
        path.startsWith("/products/")

    if (isPublicRoute) {
        return NextResponse.next()
    }

    const token =
        req.cookies.get("access_token")?.value ||
        req.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return redirectToAuth(req, path)
    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
        console.error("JWT_SECRET is not defined")
        return redirectToAuth(req, path)
    }

    try {
        jwt.verify(token, jwtSecret)
        return NextResponse.next()
    } catch {
        return redirectToAuth(req, path)
    }
}

function redirectToAuth(req: NextRequest, path: string) {
    const redirectUrl = new URL("/auth", req.nextUrl)
    redirectUrl.searchParams.set("callbackPath", path)
    return NextResponse.redirect(redirectUrl)
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
