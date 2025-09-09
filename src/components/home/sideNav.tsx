"use client"

import { useSession } from "next-auth/react";
import PatientsSideNav from "../patients/patientsSideNav";
import AdminSideNav from "@/components/admin/adminSideNav";
import DoctorsSideNav from "@/components/doctors/doctorsSideNav";
import ReceptionistsSideNav from "@/components/receptionists/receptionistsSideNav";

export default function SideNav() {
    const { data: session } = useSession();
    if (session) {
        switch (session.user?.role) {
            case "ADMIN":
                return <AdminSideNav />;
            case "DOCTOR":
                return <DoctorsSideNav />;
            case "PATIENT":
                return <PatientsSideNav />;
            case "RECEPTIONIST":
                return <ReceptionistsSideNav />;
            default:
                return;
        }
    }
};