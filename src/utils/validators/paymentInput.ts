import z from "zod";
import { PaymentMethod } from "@/db/generated/prisma";

export const paymentFormInput = z.object({
    amount: z.number(),
    method: z.enum([...Object.values(PaymentMethod)] as [PaymentMethod, ...PaymentMethod[]]),
}).strict();

export type PaymentFormInput = z.infer<typeof paymentFormInput>;

export const paymentFormInputEdit = z.object({
    amount: z.number(),
    method: z.enum([...Object.values(PaymentMethod)] as [PaymentMethod, ...PaymentMethod[]]),
}).strict();

export type PaymentFormInputEdit = z.infer<typeof paymentFormInputEdit>;