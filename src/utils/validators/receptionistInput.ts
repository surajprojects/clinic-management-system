import z from "zod";
import { Gender, Shift } from "@/db/generated/prisma";

export const receptionistFormInput = z.object({
    deskNumber: z.string().optional(),
    email: z.string(),
    password: z.string().min(8).max(32),
    name: z.string(),
    dob: z.string(),
    gender: z.enum([...Object.values(Gender)] as [Gender, ...Gender[]]),
    shift: z.enum([...Object.values(Shift)] as [Shift, ...Shift[]]),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    address: z.string().optional(),
    mobileNo: z.string().regex(/^\d{10}$/, "Mobile No. must be 10 digits number string. Example - '1234567890'"),
}).strict();

export type ReceptionistFormInput = z.infer<typeof receptionistFormInput>;

export const receptionistFormInputEdit = receptionistFormInput.partial().strict();

export type ReceptionistFormInputEdit = z.infer<typeof receptionistFormInputEdit>;