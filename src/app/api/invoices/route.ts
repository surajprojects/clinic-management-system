import prisma from "@/db";
import { verifyUser } from "@/lib/apiAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allInvoices = await prisma.invoice.findMany({});

        if (allInvoices.length <= 0) {
            return Response.json({ message: "Invoices not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all invoices!!!", allInvoices }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};