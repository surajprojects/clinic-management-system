"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { errorHandle } from "@/utils/errors/errorHandle";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify";

export default function DoctorActionBtns({ doctorId }: { doctorId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await axiosInstance.delete(`/doctors/${doctorId}`);
            if (result.status === 200) {
                toast.success("Doctor deleted successfully!");
                router.push("/admin/doctors");
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <Link href={`/admin/doctors/${doctorId}/edit`} className="hover:text-blue-500"><PencilIcon className="w-6 h-6 mx-2" /></Link>
                <button onClick={handleDelete} className="hover:text-red-500"><TrashIcon className="w-6 h-6" /></button>
            </div>
        </>
    );
};