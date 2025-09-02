"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HeaderNav() {
    const { data: session } = useSession();
    if (session) {
        if (session.user?.role === "DOCTOR") {
            return (
                <>
                    <li>
                        <Link href="/doctors/dashboard">Dashboard</Link>
                    </li>
                </>
            );
        }
        else if (session.user?.role === "RECEPTIONIST") {
            return (
                <>
                    <li>
                        <Link href="/receptionists/dashboard">Dashboard</Link>
                    </li>
                </>
            );
        }
        else if (session.user?.role === "ADMIN") {
            return (
                <>
                    <li>
                        <Link href="/admin/dashboard">Dashboard</Link>
                    </li>
                </>
            );
        }
        else {
            return (
                <>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                </>
            );
        }
    }
    else {
        return (
            <>
                <li>
                    <Link href="/">Login</Link>
                </li>
            </>
        );
    }
};