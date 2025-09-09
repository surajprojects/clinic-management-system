import { formatDate } from "@/utils/common/dateAndTime";
import { PatientData } from "@/utils/types/patientType";

export default function PatientDetails({ patientData }: { patientData: PatientData }) {
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
                    <span className="mx-2 capitalize">{patientData.user.fatherName ? patientData.user.fatherName === "" ? "N/A" : patientData.user.fatherName : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Mother&apos;s Name:</span>
                    <span className="mx-2 capitalize">{patientData.user.motherName ? patientData.user.motherName === "" ? "N/A" : patientData.user.motherName : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Date of Birth:</span>
                    <span className="mx-2">{patientData.user.dob === "" ? "N/A" : handleDate(patientData.user.dob.split("T")[0])}</span>
                </li>
                <li>
                    <span className="font-medium">Gender:</span>
                    <span className="mx-2">{patientData.user.gender === "" ? "N/A" : patientData.user.gender}</span>
                </li>
                <li>
                    <span className="font-medium">Mobile No.:</span>
                    <span className="mx-2">{patientData.user.mobileNo === "" ? "N/A" : patientData.user.mobileNo}</span>
                </li>
                <li>
                    <span className="font-medium">Email:</span>
                    <span className="mx-2">{!(patientData.user.email) ? "N/A" : patientData.user.email}</span>
                </li>
                <li>
                    <span className="font-medium">Address:</span>
                    <span className="mx-2">{patientData.user.address ? patientData.user.address === "" ? "N/A" : patientData.user.address : "N/A"}</span>
                </li>
            </ul >
        </>
    );
};