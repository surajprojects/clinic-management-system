"use client"

import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline"
import ReceptionistsTable from "@/components/receptionists/receptionistsTable";

export default function Students() {
    const [receptionistsList, setReceptionistsList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/receptionists");
                const data = result.data.allReceptionists;
                setReceptionistsList(data);
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
                    <p className="text-3xl font-medium">Receptionists</p>
                    <a href="/admin/receptionists/new" className="hover:cursor-pointer rounded-full flex items-center hover:shadow">
                        <UserPlusIcon className="w-9 h-6 text-black" />
                    </a>
                </div>
                <div>
                    <ReceptionistsTable receptionistsData={receptionistsList} />
                </div>
            </div>
        </>
    );
};