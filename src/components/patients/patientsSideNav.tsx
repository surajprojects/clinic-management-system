import Link from "next/link";

export default function PatientsSideNav() {
    return (
        <>
            <Link href="/patients/dashboard" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Dashboard</Link>
            <Link href="/patients/appointments" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Appointments</Link>
        </>
    );
};