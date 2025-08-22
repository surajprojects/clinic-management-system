import prisma from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { Prisma } from "@/db/generated/prisma";
import { PatientFormInputEdit, patientFormInputEdit } from "@/utils/validators/patientInput";

export async function GET(req: NextRequest, { params }: { params: { patientId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { patientId } = params;

        const patientData = await prisma.patient.findUnique({
            where: {
                id: patientId
            },
            include: {
                user: true,
            }
        });

        if (!patientData) {
            return Response.json({ message: "Patient not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the patient!!!", patientData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { patientId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const isAdmin = await prisma.user.findUnique({
            where: {
                role: "ADMIN",
                email: String(token.email),
            }
        });

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { patientId } = params;

        const data: PatientFormInputEdit = await req.json();
        const parsedInput = patientFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const patientData = await prisma.user.update({
            where: {
                id: patientId,
            },
            data: {
                ...(parsedInput.data.email && { email: parsedInput.data.email }),
                ...(parsedInput.data.password && { password: bcrypt.hashSync(parsedInput.data.password, 10) }),
                ...(parsedInput.data.name && { name: parsedInput.data.name }),
                ...(parsedInput.data.dob && { dob: parsedInput.data.dob }),
                ...(parsedInput.data.gender && { gender: parsedInput.data.gender }),
                ...(parsedInput.data.address && { address: parsedInput.data.address }),
                ...(parsedInput.data.mobileNo && { mobileNo: parsedInput.data.mobileNo }),
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
            }
        });

        return Response.json({ message: "Successfully updated the patient!!!", patientData }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Doctor not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { patientId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const isAdmin = await prisma.user.findUnique({
            where: {
                role: "ADMIN",
                email: String(token.email),
            }
        });

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { patientId } = params;

        await prisma.user.delete({
            where: {
                id: patientId,
            }
        });

        return Response.json({ message: "Successfully deleted the patient!!!" }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Patient not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};