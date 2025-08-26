import z from "zod";
import { InvoiceStatus } from "@/db/generated/prisma";

export const invoiceFormInput = z.object({
    description: z.string().optional(),
    dueDate: z.string(),
    invoiceStatus: z.enum([...Object.values(InvoiceStatus)] as [InvoiceStatus, ...InvoiceStatus[]]),
    discount: z.number().optional(),
    tax: z.number().optional(),
    subTotal: z.number(),
    grandTotal: z.number(),
}).strict();

export type InvoiceFormInput = z.infer<typeof invoiceFormInput>;

export const invoiceFormInputEdit = z.object({
    description: z.string().optional(),
    dueDate: z.string().optional(),
    invoiceStatus: z.enum([...Object.values(InvoiceStatus)] as [InvoiceStatus, ...InvoiceStatus[]]).optional(),
    discount: z.number().optional(),
    tax: z.number().optional(),
    subTotal: z.number().optional(),
    grandTotal: z.number().optional(),
}).strict();

export type InvoiceFormInputEdit = z.infer<typeof invoiceFormInputEdit>;