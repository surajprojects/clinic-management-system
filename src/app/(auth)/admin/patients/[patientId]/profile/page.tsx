"use client"

import axiosInstance from "@/utils/axios";
import { useEffect, useState, use } from "react";
import { PatientData } from "@/utils/types/patientType";
import { errorHandle } from "@/utils/errors/errorHandle";
import PatientDetails from "@/components/patients/patientDetails";
import PatientActionBtns from "@/components/patients/patientActionBtns";

export default function PatientProfile({
    params
}: {
    params: Promise<{ patientId: string }>
}) {
    const initialData = {
        id: "",
        isActive: false,
        userId: "",
        createdAt: "",
        updatedAt: "",
        user: {
            id: "",
            address: "",
            dob: "",
            email: "",
            fatherName: "",
            motherName: "",
            gender: "",
            mobileNo: "",
            name: "",
            role: "",
            createdAt: "",
            updatedAt: "",
        },
        doctors: [],
        records: [],
        invoices: [],
        appointments: [],
    };

    const { patientId } = use(params);
    const [patientData, setPatientData] = useState<PatientData>(initialData);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get(`/patients/${patientId}`);
                if (result.status === 200) {
                    const data = result.data.patientData;
                    setPatientData(data);
                }
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [patientId]);

    if (!patientData) {
        return (
            <>
                <div>
                    <div className="border-b-2 border-gray-400 pb-2 mb-5">
                        <p className="text-3xl font-medium">Patient Profile</p>
                    </div>
                    <div className="my-6 flex justify-center">
                        <p>Patient not found!!!</p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div className="border-b-2 border-gray-400 pb-2 mb-5 flex justify-between">
                        <p className="text-3xl font-medium capitalize">{patientData.user.name === "" ? "N/A" : patientData.user.name}</p>
                        <div className="flex">
                            <PatientActionBtns patientId={patientId} />
                        </div>
                    </div>
                    <div className="my-8">
                        <PatientDetails patientData={patientData} />
                    </div>
                </div>
            </>
        );
    }
};