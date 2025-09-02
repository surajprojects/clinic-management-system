"use client"

import { SessionProvider } from "next-auth/react";

export default function RootWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
        </>
    );
};