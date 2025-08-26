import prisma from "@/db";
import { Prisma } from "@/db/generated/prisma";
import { verifyUser } from "@/lib/apiAuth";
import { NextRequest } from "next/server";
import { AppointmentFormInput, appointmentFormInput } from "@/utils/validators/appointmentInput";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allAppointments = await prisma.appointment.findMany({
            where: {
                isActive: true,
            },
            include: {
                doctor: true,
                patient: true,
            }
        });

        if (allAppointments.length <= 0) {
            return Response.json({ message: "Appointments not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all appointments!!!", allAppointments }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const token = await verifyUser(req, ["ADMIN", "RECEPTIONIST"]);

        if (!token || !token.role || !token.sub) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const data: AppointmentFormInput = await req.json();
        const parsedInput = appointmentFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        await prisma.appointment.create({
            data: {
                tokenNumber: 1,
                doctorId: parsedInput.data.doctorId,
                patientId: parsedInput.data.patientId,
                date: parsedInput.data.date,
                bookedByRole: token.role,
                bookedById: token.sub,
                status: parsedInput.data.status,
                ...(parsedInput.data.reason && { reason: parsedInput.data.reason }),
            }
        });

        return Response.json({ message: "Successfully created the appointment!!!" }, { status: 201 });
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