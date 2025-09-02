import Link from "next/link";

export default function AdminSideNav() {
    return (
        <>
            <Link href="/admin/dashboard" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Dashboard</Link>
            <Link href="/admin/doctors" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Doctors</Link>
            <Link href="/admin/receptionists" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Receptionists</Link>
            <Link href="/admin/appointments" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Appointments</Link>
            <Link href="/admin/patients" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Patients</Link>
        </>
    );
};