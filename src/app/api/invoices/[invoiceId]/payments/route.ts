import prisma from "@/db";
import { Prisma } from "@/db/generated/prisma";
import { PaymentFormInput, paymentFormInput } from "@/utils/validators/paymentInput";
import { verifyUser } from "@/lib/apiAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allPayments = await prisma.payment.findMany({
            where: {
                isActive: true,
            },
        });

        if (allPayments.length <= 0) {
            return Response.json({ message: "Payments not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all payments!!!", allPayments }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function POST(req: NextRequest, { params }: { params: { invoiceId: string } }) {
    try {
        const data: PaymentFormInput = await req.json();
        const parsedInput = paymentFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const { invoiceId } = params;

        await prisma.payment.create({
            data: {
                invoiceId,
                amount: parsedInput.data.amount,
                method: parsedInput.data.method,
            }
        });

        return Response.json({ message: "Successfully created the payment!!!" }, { status: 201 });
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