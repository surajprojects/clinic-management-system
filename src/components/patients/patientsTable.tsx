import PatientActionBtns from "./patientActionBtns";
import PatientsTableField from "./patientsTableField";
import { PatientsList } from "@/utils/types/patientType";

export default function PatientsTable({ patientsData }: { patientsData: PatientsList }) {
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
                                Patient's Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Father's Name
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
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientsData.length > 0 ?
                            patientsData.map((patient, idx: number) => {
                                return <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="px-6 py-4">
                                        {idx + 1}
                                    </td>
                                    <PatientsTableField patientId={patient.id} name={patient.user.name} />
                                    <td className="px-6 py-4">
                                        {patient.user.fatherName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient.user.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient.user.mobileNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient.user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <PatientActionBtns patientId={patient.id} />
                                    </td>
                                </tr>
                            })
                            :
                            <tr className="h-14"><td colSpan={7} className="text-center">No doctors found!!!</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};