import prisma from "@/db";
import { Prisma } from "@/db/generated/prisma";
import { InvoiceItemFormInput, invoiceItemFormInput } from "@/utils/validators/invoiceItemInput";
import { verifyUser } from "@/lib/apiAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allInvoiceItems = await prisma.invoiceItem.findMany({});

        if (allInvoiceItems.length <= 0) {
            return Response.json({ message: "Invoice items not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all invoice items!!!", allInvoiceItems }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function POST(req: Request) {
    try {
        const data: InvoiceItemFormInput = await req.json();
        const parsedInput = invoiceItemFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        await prisma.invoiceItem.create({
            data: {
                itemType: parsedInput.data.itemType,
                name: parsedInput.data.name,
                rate: parsedInput.data.rate,
                ...(parsedInput.data.description && { description: parsedInput.data.description }),
            }
        });

        return Response.json({ message: "Successfully created the invoice item!!!" }, { status: 201 });
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