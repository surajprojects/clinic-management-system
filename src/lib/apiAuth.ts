import { getToken, JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { Role } from "@/db/generated/prisma";

export interface CustomToken extends JWT {
    role?: Role;
};

export async function verifyUser(req: NextRequest, roles?: Role[]) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as CustomToken | null;

    if (!token) {
        return null;
    }

    if (roles && (!token.role || !roles.includes(token.role))) {
        return null;
    }

    return token;
};