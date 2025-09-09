"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import ReceptionistForm from "@/components/receptionists/receptionistForm";
import { ReceptionistFormInput } from "@/utils/validators/receptionistInput";

export default function NewReceptionist() {
    const router = useRouter();
    const handleSubmit = async (formData: ReceptionistFormInput) => {
        try {
            const result = await axiosInstance.post("/receptionists", formData);
            router.push(`/admin/receptionists/${result.data.receptionistData.receptionist.id}/profile`);
            toast.success("Receptionist created successfully!!!");
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
                    <p className="text-3xl font-medium">Add Receptionist</p>
                </div>
                <div className="my-8">
                    <ReceptionistForm handleSubmitForm={handleSubmit} />
                </div>
            </div>
        </>
    );
};