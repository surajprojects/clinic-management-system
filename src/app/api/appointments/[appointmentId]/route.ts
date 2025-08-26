import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { Prisma } from "@/db/generated/prisma";
import { AppointmentFormInputEdit, appointmentFormInputEdit } from "@/utils/validators/appointmentInput";

export async function GET(req: NextRequest, { params }: { params: { appointmentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { appointmentId } = params;

        const appointmentData = await prisma.appointment.findUnique({
            where: {
                id: appointmentId,
                isActive: true,
            },
            include: {
                doctor: true,
                patient: true,
            }
        });

        if (!appointmentData) {
            return Response.json({ message: "Appointment not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the appointment!!!", appointmentData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { appointmentId: string } }) {
    try {
        const token = await verifyUser(req, ["ADMIN", "RECEPTIONIST"]);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { appointmentId } = params;

        const data: AppointmentFormInputEdit = await req.json();
        const parsedInput = appointmentFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const doctorData = await prisma.appointment.update({
            where: {
                id: appointmentId,
            },
            data: {
                ...(parsedInput.data.doctorId && { doctorId: parsedInput.data.doctorId }),
                ...(parsedInput.data.patientId && { patientId: parsedInput.data.patientId }),
                ...(parsedInput.data.status && { status: parsedInput.data.status }),
                ...(parsedInput.data.date && { date: parsedInput.data.date }),
            }
        });

        return Response.json({ message: "Successfully updated the appointment!!!", doctorData }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Appointment not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { appointmentId: string } }) {
    try {
        const token = await verifyUser(req, ["ADMIN", "RECEPTIONIST"]);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { appointmentId } = params;

        // soft delete to maintain other related records
        await prisma.appointment.update({
            where: {
                id: appointmentId,
            },
            data: {
                isActive: false,
            }
        });

        return Response.json({ message: "Successfully deleted the appointment!!!" }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Appointment not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};