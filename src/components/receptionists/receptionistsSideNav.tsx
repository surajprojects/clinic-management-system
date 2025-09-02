import Link from "next/link";

export default function ReceptionistsSideNav() {
    return (
        <>
            <Link href="/receptionists/dashboard" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Dashboard</Link>
            <Link href="/receptionists/appointments" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Appointments</Link>
            <Link href="/receptionists/patients" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Patients</Link>
        </>
    );
};