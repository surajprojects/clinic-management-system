"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import PatientForm from "@/components/patients/patientForm";
import { PatientFormInput } from "@/utils/validators/patientInput";

export default function NewPatient() {
    const router = useRouter();
    const handleSubmit = async (formData: PatientFormInput) => {
        try {
            const result = await axiosInstance.post("/patients", formData);
            router.push(`/admin/patients/${result.data.patientData.patient.id}/profile`);
            toast.success("Patient created successfully!!!");
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
                    <p className="text-3xl font-medium">Add Patient</p>
                </div>
                <div className="my-8">
                    <PatientForm handleSubmitForm={handleSubmit} />
                </div>
            </div>
        </>
    );
};