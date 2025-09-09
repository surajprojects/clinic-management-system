import { DoctorData } from "@/utils/types/doctorType";
import { formatDate } from "@/utils/common/dateAndTime";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function DoctorDetails({ doctorData }: { doctorData: DoctorData }) {
    const handleDate = (yyyymmdd: string) => {
        if (!formatDate(yyyymmdd)) {
            return `${yyyymmdd.split("-")[2]}-${yyyymmdd.split("-")[1]}-${yyyymmdd.split("-")[0]}`;
        }
        return formatDate(yyyymmdd);
    };
    return (
        <>
            <ul className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li>
                    <span className="font-medium">Father&apos;s Name:</span>
                    <span className="mx-2 capitalize">{doctorData.user.fatherName ? doctorData.user.fatherName === "" ? "N/A" : doctorData.user.fatherName : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Mother&apos;s Name:</span>
                    <span className="mx-2 capitalize">{doctorData.user.motherName ? doctorData.user.motherName === "" ? "N/A" : doctorData.user.motherName : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Date of Birth:</span>
                    <span className="mx-2">{doctorData.user.dob === "" ? "N/A" : handleDate(doctorData.user.dob.split("T")[0])}</span>
                </li>
                <li>
                    <span className="font-medium">Gender:</span>
                    <span className="mx-2">{doctorData.user.gender === "" ? "N/A" : doctorData.user.gender}</span>
                </li>
                <li>
                    <span className="font-medium">Mobile No.:</span>
                    <span className="mx-2">{doctorData.user.mobileNo === "" ? "N/A" : doctorData.user.mobileNo}</span>
                </li>
                <li>
                    <span className="font-medium">Email:</span>
                    <span className="mx-2">{!(doctorData.user.email) ? "N/A" : doctorData.user.email}</span>
                </li>
                <li>
                    <span className="font-medium">Address:</span>
                    <span className="mx-2">{doctorData.user.address ? doctorData.user.address === "" ? "N/A" : doctorData.user.address : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Specialization:</span>
                    <span className="mx-2">{doctorData.specialization === "" ? "N/A" : doctorData.specialization}</span>
                </li>
                <li>
                    <span className="font-medium">Registration No:</span>
                    <span className="mx-2">{doctorData.registrationNo === "" ? "N/A" : doctorData.registrationNo}</span>
                </li>
                <li>
                    <span className="font-medium">Year of Experience:</span>
                    <span className="mx-2">{typeof doctorData.yearOfExperience === "number" ? doctorData.yearOfExperience : "N/A"}</span>
                </li>
                <li className="flex ">
                    <span className="font-medium">Verified:</span>
                    <span className="mx-2">{typeof doctorData.verified === "boolean" && doctorData.verified ? <CheckBadgeIcon className="w-6 h-6 text-green-500" /> : <XCircleIcon className="w-6 h-6 text-red-500" />}</span>
                </li>
            </ul >
        </>
    );
};