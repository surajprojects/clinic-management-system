"use client"

import Link from "next/link";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"

export default function PatientActionBtns({ patientId }: { patientId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await axiosInstance.delete(`/patients/${patientId}`);
            if (result.status === 200) {
                toast.success("Patient deleted successfully!");
                router.push("/admin/patients");
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <Link href={`/admin/patients/${patientId}/edit`} className="hover:text-blue-500"><PencilIcon className="w-6 h-6 mx-2" /></Link>
                <button onClick={handleDelete} className="hover:text-red-500 hover:cursor-pointer"><TrashIcon className="w-6 h-6" /></button>
            </div>
        </>
    );
};