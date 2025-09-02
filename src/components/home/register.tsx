"use client"

import { useRouter } from "next/navigation";
import CardField from "@/components/ui/cardField";
import { ChangeEvent, FormEvent, useState } from "react";
import { Gender } from "@/db/generated/prisma";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import Spinner from "@/components/ui/spinner";

export default function Register() {
    const router = useRouter();
    const initialData = {
        name: "",
        fatherName: "",
        motherName: "",
        dob: "",
        gender: "",
        email: "",
        mobileNo: "",
        address: "",
        password: "",
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialData);

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

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        evt.preventDefault();

        if (!Object.values(Gender).includes(formData.gender as Gender)) {
            throw new Error("Invalid gender");
        }

        try {
            await axiosInstance.post("/auth/register", formData);
            router.push("/");
            toast.success("Patient created successfully!");
        }
        catch (error) {
            errorHandle(error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="border border-[#e5e7eb] shadow-md p-8 rounded-lg">
                <h3 className="text-3xl font-medium text-center mb-5 underline">Patient's Register</h3>
                <form
                    onSubmit={handleSubmit}
                    className="h-full flex flex-col justify-around pb-4"
                >
                    {/* Name */}
                    <CardField
                        id="name"
                        title="Name"
                        textHolder="Enter the name"
                        fieldValue={formData.name}
                        onChangeFunc={handleChange}
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
                    />
                    {/* Gender */}
                    <div>
                        <label htmlFor="gender">Gender*</label>
                        <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mx-2 my-1 border-2 border-[#e5e7eb] rounded-md px-1"
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
                    />
                    {/* Email */}
                    <CardField
                        fieldType="email"
                        id="email"
                        title="Email"
                        textHolder="Enter email address"
                        fieldValue={formData.email}
                        onChangeFunc={handleChange}
                    />
                    {/* Password */}
                    <div>
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter the password"
                            minLength={8}
                            maxLength={32}
                            value={formData.password}
                            onChange={handleChange}
                            className="mx-2 my-1 border-2 border-[#e5e7eb] rounded-md px-1"
                        />
                    </div>
                    {/* Address */}
                    <CardField
                        id="address"
                        title="Address"
                        textHolder="Enter the address"
                        fieldValue={formData.address}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {isLoading && <Spinner />}
                    {/* Buttons */}
                    <div className="col-span-4 mt-5">
                        <button type="submit" className="bg-green-500 w-full rounded-md shadow text-white py-1 hover:cursor-pointer hover:bg-green-600 disabled:bg-green-600 disabled:cursor-not-allowed" disabled={isLoading}>Register</button>
                    </div>
                </form>
            </div>
        </>
    );
};