import Link from "next/link";

export default function DoctorsSideNav() {
    return (
        <>
            <Link href="/doctors/dashboard" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Dashboard</Link>
            <Link href="/doctors/appointments" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Appointments</Link>
            <Link href="/doctors/patients" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Patients</Link>
        </>
    );
};