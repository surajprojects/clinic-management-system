"use client"

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { Gender } from "@/db/generated/prisma";
import CardField from "@/components/ui/cardField";
import { errorHandle } from "@/utils/errors/errorHandle";
import { ChangeEvent, useEffect, useState } from "react";
import { DoctorData } from "@/utils/types/doctorType";
import { DoctorFormInput, DoctorFormInputEdit } from "@/utils/validators/doctorInput";

export default function DoctorForm({
    handleSubmitForm,
    handleSubmitFormEdit,
    doctorId,
    isEdit = false
}: {
    handleSubmitForm?: (formData: DoctorFormInput, id?: string) => Promise<boolean>,
    handleSubmitFormEdit?: (formData: DoctorFormInputEdit, id: string, prefetchData: DoctorData) => Promise<boolean>,
    doctorId?: string,
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
        specialization: "",
        registrationNo: "",
        yearOfExperience: 0,
        verified: false,
    };

    const router = useRouter();
    const [formData, setFormData] = useState(initialData);
    const [prefetchData, setPrefetchData] = useState<DoctorData>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            const getData = async () => {
                try {
                    setIsLoading(true);
                    const result = await axiosInstance.get(`/doctors/${doctorId}`);
                    const data: DoctorData = result.data.doctorData;
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
                            specialization: data.specialization ? data.specialization : "",
                            registrationNo: data.registrationNo ? data.registrationNo : "",
                            yearOfExperience: typeof data.yearOfExperience === "number" && data.yearOfExperience > 0 ? data.yearOfExperience : 0,
                            verified: typeof data.verified === "boolean" && data.verified,
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
    }, [isEdit, doctorId]);

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

    const handleSubmitFunc = async (evt: HTMLFormElement) => {
        evt.preventDefault();

        if (!Object.values(Gender).includes(formData.gender as Gender)) {
            throw new Error("Invalid gender");
        }

        if (isEdit && doctorId && prefetchData && handleSubmitFormEdit) {
            const isSuccess = await handleSubmitFormEdit(
                {
                    ...formData,
                    gender: formData.gender as Gender,
                }, doctorId, prefetchData);

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
                    }, doctorId);

                if (isSuccess) {
                    setFormData(initialData)
                }
            }
        }
    };

    return (
        <>
            {isLoading ?
                <Spinner />
                :
                <form
                    onSubmit={() => handleSubmitFunc}
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
                    {/* Specialization */}
                    <CardField
                        id="specialization"
                        title="Specialization"
                        textHolder="Enter the specialization"
                        fieldValue={formData.specialization}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Registration Number */}
                    <CardField
                        id="registrationNo"
                        title="Registration No."
                        textHolder="Enter the registration number"
                        fieldValue={formData.registrationNo}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Verified Status */}
                    <div>
                        <label htmlFor="verified">Verified</label>
                        <input
                            type="checkbox"
                            name="verified"
                            id="verified"
                            checked={formData.verified}
                            onChange={() => setFormData((prevData) => {
                                return { ...prevData, verified: !prevData.verified };
                            })}
                            className="mx-2"
                        />
                    </div>
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