import { formatDate } from "@/utils/common/dateAndTime";
import { ReceptionistData } from "@/utils/types/receptionistType";

export default function ReceptionistDetails({ receptionistData }: { receptionistData: ReceptionistData }) {
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
                    <span className="mx-2 capitalize">{receptionistData.user.fatherName ? receptionistData.user.fatherName === "" ? "N/A" : receptionistData.user.fatherName : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Mother&apos;s Name:</span>
                    <span className="mx-2 capitalize">{receptionistData.user.motherName ? receptionistData.user.motherName === "" ? "N/A" : receptionistData.user.motherName : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Date of Birth:</span>
                    <span className="mx-2">{receptionistData.user.dob === "" ? "N/A" : handleDate(receptionistData.user.dob.split("T")[0])}</span>
                </li>
                <li>
                    <span className="font-medium">Gender:</span>
                    <span className="mx-2">{receptionistData.user.gender === "" ? "N/A" : receptionistData.user.gender}</span>
                </li>
                <li>
                    <span className="font-medium">Mobile No.:</span>
                    <span className="mx-2">{receptionistData.user.mobileNo === "" ? "N/A" : receptionistData.user.mobileNo}</span>
                </li>
                <li>
                    <span className="font-medium">Email:</span>
                    <span className="mx-2">{!(receptionistData.user.email) ? "N/A" : receptionistData.user.email}</span>
                </li>
                <li>
                    <span className="font-medium">Address:</span>
                    <span className="mx-2">{receptionistData.user.address ? receptionistData.user.address === "" ? "N/A" : receptionistData.user.address : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Shift:</span>
                    <span className="mx-2">{receptionistData.shift === "" ? "N/A" : receptionistData.shift}</span>
                </li>
                <li>
                    <span className="font-medium">Desk No:</span>
                    <span className="mx-2">{receptionistData.deskNumber === "" ? "N/A" : receptionistData.deskNumber}</span>
                </li>
            </ul >
        </>
    );
};