"use client"

import axiosInstance from "@/utils/axios";
import { useEffect, useState, use } from "react";

import { errorHandle } from "@/utils/errors/errorHandle";
import { ReceptionistData } from "@/utils/types/receptionistType";
import ReceptionistActionBtns from "@/components/receptionists/receptionistActionBtns";
import ReceptionistDetails from "@/components/receptionists/receptionistDetails";


export default function ReceptionistProfile({
    params
}: {
    params: Promise<{
        receptionistId: string
    }>
}) {
    const initialData = {
        id: "",
        shift: "",
        deskNumber: "",
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
    };

    const { receptionistId } = use(params);
    const [receptionistData, setReceptionistData] = useState<ReceptionistData>(initialData);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get(`/receptionists/${receptionistId}`);
                if (result.status === 200) {
                    const data = result.data.receptionistData;
                    setReceptionistData(data);
                }
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [receptionistId]);

    if (!receptionistData) {
        return (
            <>
                <div>
                    <div className="border-b-2 border-gray-400 pb-2 mb-5">
                        <p className="text-3xl font-medium">Receptionist Profile</p>
                    </div>
                    <div className="my-6 flex justify-center">
                        <p>Receptionist not found!!!</p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div className="border-b-2 border-gray-400 pb-2 mb-5 flex justify-between">
                        <p className="text-3xl font-medium capitalize">{receptionistData.user.name === "" ? "N/A" : receptionistData.user.name}</p>
                        <div className="flex">
                            <ReceptionistActionBtns receptionistId={receptionistData.id} />
                        </div>
                    </div>
                    <div className="my-8">
                        <ReceptionistDetails receptionistData={receptionistData} />
                    </div>
                </div>
            </>
        );
    }
};