import prisma from "@/db";
import { Prisma } from "@/db/generated/prisma";
import { InvoiceFormInput, invoiceFormInput } from "@/utils/validators/invoiceInput";
import { verifyUser } from "@/lib/apiAuth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { patientId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const data: InvoiceFormInput = await req.json();
        const parsedInput = invoiceFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const { patientId } = params;

        await prisma.invoice.create({
            data: {
                grandTotal: parsedInput.data.grandTotal,
                invoiceNumber: "sd",
                status: "CANCELLED",
                subTotal: parsedInput.data.subTotal,
                patientId,
            }
        });

        return Response.json({ message: "Successfully created the invoice!!!" }, { status: 201 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return Response.json({ message: "Already exists!" }, { status: 409 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};