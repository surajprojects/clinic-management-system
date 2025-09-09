"use client"

import { useRouter } from "next/navigation";

export default function DoctorsTableField({ doctorId, name }: { doctorId: string, name: string }) {
    const router = useRouter();
    return (
        <>
            <th scope="row" onClick={() => router.push(`/admin/doctors/${doctorId}/profile`)} className="px-6 py-4 font-medium hover:cursor-pointer text-gray-900 whitespace-nowrap capitalize">
                {name}
            </th>
        </>
    );
};