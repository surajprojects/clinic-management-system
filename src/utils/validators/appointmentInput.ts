import z from "zod";
import { AppointmentStatus } from "@/db/generated/prisma";

export const appointmentFormInput = z.object({
    doctorId: z.string(),
    patientId: z.string(),
    date: z.string(),
    reason: z.string().optional(),
    status: z.enum([...Object.values(AppointmentStatus)] as [AppointmentStatus, ...AppointmentStatus[]]),
}).strict();

export type AppointmentFormInput = z.infer<typeof appointmentFormInput>;

export const appointmentFormInputEdit = z.object({
    doctorId: z.string().optional(),
    patientId: z.string().optional(),
    date: z.string().optional(),
    reason: z.string().optional(),
    status: z.enum([...Object.values(AppointmentStatus)] as [AppointmentStatus, ...AppointmentStatus[]]).optional(),
}).strict();

export type AppointmentFormInputEdit = z.infer<typeof appointmentFormInputEdit>;



