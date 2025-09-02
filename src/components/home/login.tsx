"use client"

import Link from "next/link";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
    const router = useRouter();
    const initialData = {
        email: "",
        password: ""
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
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
        const result = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });
        setFormData(initialData);
        setIsLoading(false);
        if (result?.ok) {
            toast.success("Login successful!!!");
            router.replace("/postlogin");
        }
        else if (result?.error) {
            toast.error("Invalid username or password!!!");
        }
        else {
            toast.error("Something went wrong!!!");
        }
    };

    return (
        <>
            <div className="border border-[#e5e7eb] shadow-md p-8 rounded-lg">
                <h3 className="text-3xl font-medium text-center mb-5">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border-2 border-[#e5e7eb] rounded-md px-1 my-1"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border-2 border-[#e5e7eb] rounded-md px-1 my-1"
                        />
                    </div>
                    {isLoading && <Spinner />}
                    <div>
                        <button type="submit" className="bg-green-500 w-full rounded-md text-white py-1 hover:cursor-pointer hover:bg-green-600  disabled:bg-green-600 disabled:cursor-not-allowed" disabled={isLoading}>Login</button>
                        <p className="text-center mt-3">New here?<Link href="/register" className="ml-1 text-blue-600 hover:cursor-pointer hover:text-blue-700">Register</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
};