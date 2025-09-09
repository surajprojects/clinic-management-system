"use client"

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import CardField from "@/components/ui/cardField";
import { Gender, Shift } from "@/db/generated/prisma";
import { errorHandle } from "@/utils/errors/errorHandle";
import { ChangeEvent, useEffect, useState } from "react";
import { ReceptionistData } from "@/utils/types/receptionistType";
import { ReceptionistFormInput, ReceptionistFormInputEdit } from "@/utils/validators/receptionistInput";

export default function ReceptionistForm({
    handleSubmitForm,
    handleSubmitFormEdit,
    receptionistId,
    isEdit = false
}: {
    handleSubmitForm?: (formData: ReceptionistFormInput, id?: string) => Promise<boolean>,
    handleSubmitFormEdit?: (formData: ReceptionistFormInputEdit, id: string, prefetchData: ReceptionistData) => Promise<boolean>,
    receptionistId?: string,
    isEdit?: boolean
}) {
    const initialData = {
        name: "",
        fatherName: "",
        motherName: "",
        dob: "",
        gender: "",
        mobileNo: "",
        email: "",
        address: "",
        password: "",
        shift: "",
        deskNumber: "",
    };

    const router = useRouter();
    const [formData, setFormData] = useState(initialData);
    const [prefetchData, setPrefetchData] = useState<ReceptionistData>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            const getData = async () => {
                try {
                    setIsLoading(true);
                    const result = await axiosInstance.get(`/receptionists/${receptionistId}`);
                    const data: ReceptionistData = result.data.receptionistData;
                    setPrefetchData(data);
                    setFormData((prevData) => {
                        return {
                            ...prevData,
                            name: data.user.name ? data.user.name : "",
                            fatherName: data.user.fatherName ? data.user.fatherName : "",
                            motherName: data.user.motherName ? data.user.motherName : "",
                            dob: data.user.dob ? data.user.dob.split("T")[0] : "",
                            gender: data.user.gender ? data.user.gender : "",
                            mobileNo: data.user.mobileNo ? data.user.mobileNo : "",
                            email: data.user.email ? data.user.email : "",
                            address: data.user.address ? data.user.address : "",
                            shift: data.shift ? data.shift : "",
                            deskNumber: data.deskNumber ? data.deskNumber : "",
                        }
                    });
                    setIsLoading(false);
                }
                catch (error) {
                    errorHandle(error);
                }
            };
            getData();
        };
    }, [isEdit, receptionistId]);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const changedValue = evt.target.value;
        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: changedValue
            }
        });
    };

    return (
        <>
            {isLoading ?
                <Spinner />
                :
                <form
                    onSubmit={async (evt) => {
                        evt.preventDefault();

                        if (!Object.values(Gender).includes(formData.gender as Gender)) {
                            throw new Error("Invalid gender");
                        }

                        if (!Object.values(Shift).includes(formData.shift as Shift)) {
                            throw new Error("Invalid shift");
                        }

                        if (isEdit && receptionistId && prefetchData && handleSubmitFormEdit) {
                            const isSuccess = await handleSubmitFormEdit(
                                {
                                    ...formData,
                                    gender: formData.gender as Gender,
                                    shift: formData.shift as Shift,
                                }, receptionistId, prefetchData);

                            if (isSuccess) {
                                setFormData(initialData)
                            }
                        }
                        else {
                            if (handleSubmitForm) {
                                const isSuccess = await handleSubmitForm(
                                    {
                                        ...formData,
                                        gender: formData.gender as Gender,
                                        shift: formData.shift as Shift,
                                    }, receptionistId);

                                if (isSuccess) {
                                    setFormData(initialData)
                                }
                            }
                        }
                    }}
                    className="grid grid-cols-1 xl:grid-cols-4 gap-2 xl:gap-6"
                >
                    {/* Full Name */}
                    <CardField
                        id="name"
                        title="Full Name"
                        textHolder="Enter the full name"
                        fieldValue={formData.name}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Father's Name */}
                    <CardField
                        id="fatherName"
                        title="Father's Name"
                        textHolder="Enter the father's name"
                        fieldValue={formData.fatherName}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Mother's Name */}
                    <CardField
                        id="motherName"
                        title="Mother's Name"
                        textHolder="Enter the mother's name"
                        fieldValue={formData.motherName}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Date of Birth */}
                    <CardField
                        fieldType="date"
                        id="dob"
                        title="Date of Birth"
                        isTextHolder={false}
                        fieldValue={formData.dob}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Gender */}
                    <div>
                        <label htmlFor="gender">Gender{!isEdit && "*"}</label>
                        <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mx-2 border-2 rounded-md px-1"
                            required={!isEdit}
                        >
                            <option value="" disabled>Select Gender</option>
                            {[...Object.values(Gender)].map((opt, idx) => {
                                return <option key={idx} value={opt}>{opt}</option>
                            })}
                        </select>
                    </div>
                    {/* Mobile Number */}
                    <CardField
                        id="mobileNo"
                        title="Mobile No."
                        textHolder="00000 00000"
                        fieldValue={formData.mobileNo}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Email */}
                    <CardField
                        fieldType="email"
                        id="email"
                        title="Email"
                        textHolder="Enter email address"
                        fieldValue={formData.email}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Address */}
                    <CardField
                        id="address"
                        title="Address"
                        textHolder="Enter the address"
                        fieldValue={formData.address}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Password */}
                    <CardField
                        fieldType="password"
                        id="password"
                        title="Password"
                        textHolder="Enter the password"
                        fieldValue={formData.password}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Shift */}
                    <div>
                        <label htmlFor="shift">Shift{!isEdit && "*"}</label>
                        <select
                            name="shift"
                            id="shift"
                            value={formData.shift}
                            onChange={handleChange}
                            className="mx-2 border-2 rounded-md px-1"
                            required={!isEdit}
                        >
                            <option value="" disabled>Select Shift</option>
                            {[...Object.values(Shift)].map((opt, idx) => {
                                return <option key={idx} value={opt}>{opt}</option>
                            })}
                        </select>
                    </div>
                    {/* Desk Number */}
                    <CardField
                        id="deskNumber"
                        title="Desk No."
                        textHolder="ABC123"
                        fieldValue={formData.deskNumber}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Buttons */}
                    <div className="col-span-4 my-5">
                        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md shadow hover:cursor-pointer">Submit</button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-red-500 text-white px-2 py-1 rounded-md mx-2 shadow hover:cursor-pointer"
                        >Cancel</button>
                    </div>
                </form >
            }
        </>
    );
};