"use client"

import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { errorHandle } from "@/utils/errors/errorHandle";

export default function Dashboard() {
    return (
        <>
            <div>
                <div className="border-b-2 border-gray-400 pb-2 mb-5 flex justify-between">
                    <p className="text-3xl font-medium">Dashboard</p>
                </div>
                <div>
                    <p className="italic text-gray-500">Content here...</p>
                </div>
            </div>
        </>
    );
};