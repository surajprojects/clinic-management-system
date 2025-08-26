import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { Prisma } from "@/db/generated/prisma";
import { InvoiceFormInputEdit, invoiceFormInputEdit } from "@/utils/validators/invoiceInput";

export async function GET(req: NextRequest, { params }: { params: { invoiceId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { invoiceId } = params;

        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
            },
        });

        if (!invoiceData) {
            return Response.json({ message: "Invoice not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the invoice!!!", invoiceData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { invoiceId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const data: InvoiceFormInputEdit = await req.json();
        const parsedInput = invoiceFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const { invoiceId } = params;

        const itemData = await prisma.invoice.update({
            where: {
                id: invoiceId,
            },
            data: {
                ...(parsedInput.data.grandTotal && { grandTotal: parsedInput.data.grandTotal }),
            }
        });

        return Response.json({ message: "Successfully updated the invoice!!!", itemData }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Invoice not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { invoiceId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { invoiceId } = params;

        // soft delete to maintain other related records
        await prisma.invoice.update({
            where: {
                id: invoiceId,
            },
            data: {
                isActive: false,
            }
        });

        return Response.json({ message: "Successfully deleted the invoice!!!" }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Invoice not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};