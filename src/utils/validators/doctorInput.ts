import z from "zod";
import { Gender } from "@/db/generated/prisma";

export const doctorFormInput = z.object({
    specialization: z.string(),
    registrationNo: z.string(),
    yearOfExperience: z.number(),
    email: z.string(),
    password: z.string().min(8).max(32),
    name: z.string(),
    dob: z.string(),
    gender: z.enum([...Object.values(Gender)] as [Gender, ...Gender[]]),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    address: z.string().optional(),
    verified: z.boolean().optional(),
    mobileNo: z.string().regex(/^\d{10}$/, "Mobile No. must be 10 digits number string. Example - '1234567890'"),
}).strict();

export type DoctorFormInput = z.infer<typeof doctorFormInput>;

export const doctorFormInputEdit = doctorFormInput.partial().strict();

export type DoctorFormInputEdit = z.infer<typeof doctorFormInputEdit>;

