import ReceptionistActionBtns from "./receptionistActionBtns";
import ReceptionistsTableField from "./receptionistsTableField";
import { ReceptionistsList } from "@/utils/types/receptionistType";

export default function ReceptionistsTable({ receptionistsData }: { receptionistsData: ReceptionistsList }) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Doctor's Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Gender
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Staff
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Desk Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {receptionistsData.length > 0 ?
                            receptionistsData.map((receptionist, idx: number) => {
                                return <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="px-6 py-4">
                                        {idx + 1}
                                    </td>
                                    <ReceptionistsTableField receptionistId={receptionist.id} name={receptionist.user.name} />
                                    <td className="px-6 py-4">
                                        {receptionist.user.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        {receptionist.user.mobileNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {receptionist.user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {receptionist.shift}
                                    </td>
                                    <td className="px-6 py-4">
                                        {receptionist.deskNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ReceptionistActionBtns receptionistId={receptionist.id} />
                                    </td>
                                </tr>
                            })
                            :
                            <tr className="h-14"><td colSpan={8} className="text-center">No receptionists found!!!</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};