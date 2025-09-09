"use client"

import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline"
import PatientsTable from "@/components/patients/patientsTable";

export default function Patients() {
    const [patientsList, setPatientsList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/patients");
                const data = result.data.allPatients;
                setPatientsList(data);
            } catch (error) {
                console.error("Failed to submit the form!", error);
            }
        };
        getData();
    }, []);
    return (
        <>
            <div>
                <div className="border-b-2 border-gray-400 pb-2 mb-6 flex justify-between">
                    <p className="text-3xl font-medium">Patients</p>
                    <a href="/admin/patients/new" className="hover:cursor-pointer rounded-full flex items-center hover:shadow">
                        <UserPlusIcon className="w-9 h-6 text-black" />
                    </a>
                </div>
                <div>
                    <PatientsTable patientsData={patientsList} />
                </div>
            </div>
        </>
    );
};