"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import DoctorForm from "@/components/doctors/doctorForm";
import { errorHandle } from "@/utils/errors/errorHandle";
import { DoctorFormInput } from "@/utils/validators/doctorInput";

export default function NewDoctor() {
    const router = useRouter();
    const handleSubmit = async (formData: DoctorFormInput) => {
        try {
            const result = await axiosInstance.post("/doctors", formData);
            router.push(`/admin/doctors/${result.data.doctorData.doctor.id}/profile`);
            toast.success("Doctor created successfully!!!");
            return true;
        } catch (error) {
            errorHandle(error);
            return false;
        }
    };
    return (
        <>
            <div>
                <div className="border-b-2 border-gray-400 pb-2 mb-5">
                    <p className="text-3xl font-medium">Add Doctor</p>
                </div>
                <div className="my-8">
                    <DoctorForm handleSubmitForm={handleSubmit} />
                </div>
            </div>
        </>
    );
};