"use client"

import axiosInstance from "@/utils/axios";
import { useEffect, useState, use } from "react";
import { DoctorData } from "@/utils/types/doctorType";
import { errorHandle } from "@/utils/errors/errorHandle";
import DoctorDetails from "@/components/doctors/doctorDetails";
import DoctorActionBtns from "@/components/doctors/doctorActionBtns";

export default function DoctorProfile({
    params
}: {
    params: Promise<{ doctorId: string }>
}) {
    const initialData = {
        id: "",
        specialization: "",
        registrationNo: "",
        yearOfExperience: 0,
        verified: false,
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
        patients: [],
    };

    const { doctorId } = use(params);
    const [doctorData, setDoctorData] = useState<DoctorData>(initialData);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get(`/doctors/${doctorId}`);
                if (result.status === 200) {
                    const data = result.data.doctorData;
                    setDoctorData(data);
                }
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [doctorId]);

    if (!doctorData) {
        return (
            <>
                <div>
                    <div className="border-b-2 border-gray-400 pb-2 mb-5">
                        <p className="text-3xl font-medium">Doctor Profile</p>
                    </div>
                    <div className="my-6 flex justify-center">
                        <p>Doctor not found!!!</p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div className="border-b-2 border-gray-400 pb-2 mb-5 flex justify-between">
                        <p className="text-3xl font-medium capitalize">{doctorData.user.name === "" ? "N/A" : doctorData.user.name}</p>
                        <div className="flex">
                            <DoctorActionBtns doctorId={doctorId} />
                        </div>
                    </div>
                    <div className="my-8">
                        <DoctorDetails doctorData={doctorData} />
                    </div>
                </div>
            </>
        );
    }
};