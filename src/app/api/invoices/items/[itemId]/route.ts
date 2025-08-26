import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { Prisma } from "@/db/generated/prisma";
import { InvoiceItemFormInputEdit, invoiceItemFormInputEdit } from "@/utils/validators/invoiceItemInput";

export async function GET(req: NextRequest, { params }: { params: { itemId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { itemId } = params;

        const itemData = await prisma.invoiceItem.findUnique({
            where: {
                id: itemId,
            },
        });

        if (!itemData) {
            return Response.json({ message: "Invoice item not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the invoice item!!!", itemData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { itemId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const data: InvoiceItemFormInputEdit = await req.json();
        const parsedInput = invoiceItemFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const { itemId } = params;

        const itemData = await prisma.invoiceItem.update({
            where: {
                id: itemId,
            },
            data: {
                ...(parsedInput.data.itemType && { itemType: parsedInput.data.itemType }),
                ...(parsedInput.data.name && { name: parsedInput.data.name }),
                ...(parsedInput.data.description && { description: parsedInput.data.description }),
                ...(parsedInput.data.rate && { rate: parsedInput.data.rate }),
            }
        });

        return Response.json({ message: "Successfully updated the invoice item!!!", itemData }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Invoice item not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { itemId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { itemId } = params;

        // soft delete to maintain other related records
        await prisma.doctor.update({
            where: {
                id: itemId,
            },
            data: {
                isActive: false,
            }
        });

        return Response.json({ message: "Successfully deleted the invoice item!!!" }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Invoice item not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};