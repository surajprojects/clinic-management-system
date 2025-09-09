"use client"

import { use } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import { ReceptionistData } from "@/utils/types/receptionistType";
import { ReceptionistFormInputEdit } from "@/utils/validators/receptionistInput";
import ReceptionistForm from "@/components/receptionists/receptionistForm";

export default function EditReceptionist({
    params
}: {
    params: Promise<{ receptionistId: string }>
}) {
    const router = useRouter();
    const { receptionistId } = use(params);

    const handleSubmit = async (formData: ReceptionistFormInputEdit, doctorId = "", prefetchData: ReceptionistData,) => {
        try {
            const result = await axiosInstance.patch(`/receptionists/${receptionistId}`, formData);
            router.push(`/admin/receptionists/${result.data.receptionistData.id}/profile`);
            toast.success("Successfully edited receptionists details!");
            return true;
        } catch (error) {
            errorHandle(error);
            return false;
        }
    };
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5">
                    <p className="text-3xl font-medium">Edit Receptionist Details</p>
                </div>
                <div className="my-8">
                    <ReceptionistForm
                        handleSubmitFormEdit={handleSubmit}
                        receptionistId={receptionistId}
                        isEdit={true}
                    />
                </div>
            </div>
        </>
    );
};