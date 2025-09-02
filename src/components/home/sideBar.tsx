import Link from "next/link";
import BtnLogout from "./btnLogout";
import SideNav from "./sideNav";

export default function SideBar() {
    return (
        <>
            <aside className="bg-gray-50 p-5 w-1/6 min-h-screen flex flex-col">
                {/* Title Container */}
                <div className="mx-4 mt-2 flex border-b-2 border-gray-400 pb-2">
                    <Link href="/" className="text-xl font-semibold hover:cursor-pointer">Clinic Management System</Link>
                </div>
                {/* Wrapper Container */}
                <nav className="mx-4 mt-6 grow flex flex-col justify-between">
                    {/* Navigation Routes */}
                    <div className="flex flex-col">
                        <SideNav />
                    </div>
                    {/* Control Settings */}
                    <div className="flex flex-col">
                        <BtnLogout />
                    </div>
                </nav>
            </aside>
        </>
    );
};