import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {

        const token = req.nextauth.token;

        if (!token) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        const pathname = req.nextUrl.pathname;

        // Role-based checks
        if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (pathname.startsWith("/doctors") && token.role !== "DOCTOR") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (pathname.startsWith("/receptionists") && token.role !== "RECEPTIONIST") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/",
        },
    }
)

export const config = {
    matcher: [
        "/admin/:path*",
        "/doctors/:path*",
        "/receptionists/:path*",
    ],
};