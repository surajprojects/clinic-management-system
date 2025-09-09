"use client"

import { use } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { DoctorData } from "@/utils/types/doctorType";
import DoctorForm from "@/components/doctors/doctorForm";
import { errorHandle } from "@/utils/errors/errorHandle";
import { DoctorFormInputEdit } from "@/utils/validators/doctorInput";

export default function EditDoctor({
    params
}: {
    params: Promise<{ doctorId: string }>
}) {
    const router = useRouter();
    const { doctorId } = use(params);

    const handleSubmit = async (formData: DoctorFormInputEdit, doctorId = "", prefetchData: DoctorData,) => {
        try {
            const result = await axiosInstance.patch(`/doctors/${doctorId}`, formData);
            router.push(`/admin/doctors/${result.data.doctorData.id}/profile`);
            toast.success("Successfully edited doctor details!");
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
                    <p className="text-3xl font-medium">Edit Doctor Details</p>
                </div>
                <div className="my-8">
                    <DoctorForm
                        handleSubmitFormEdit={handleSubmit}
                        doctorId={doctorId}
                        isEdit={true}
                    />
                </div>
            </div>
        </>
    );
};