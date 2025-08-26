import z from "zod";
import { ItemType } from "@/db/generated/prisma";

export const invoiceItemFormInput = z.object({
    name: z.string(),
    description: z.string().optional(),
    rate: z.number(),
    itemType: z.enum([...Object.values(ItemType)] as [ItemType, ...ItemType[]]),
}).strict();

export type InvoiceItemFormInput = z.infer<typeof invoiceItemFormInput>;

export const invoiceItemFormInputEdit = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    rate: z.number().optional(),
    itemType: z.enum([...Object.values(ItemType)] as [ItemType, ...ItemType[]]).optional(),
}).strict();

export type InvoiceItemFormInputEdit = z.infer<typeof invoiceItemFormInputEdit>;