import prisma from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { Prisma } from "@/db/generated/prisma";
import { ReceptionistFormInputEdit, receptionistFormInputEdit } from "@/utils/validators/receptionistInput";

export async function GET(req: NextRequest, { params }: { params: { receptionistId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { receptionistId } = params;

        const receptionistData = await prisma.receptionist.findUnique({
            where: {
                id: receptionistId,
            },
            include: {
                user: true,
            }
        });

        if (!receptionistData) {
            return Response.json({ message: "Receptionist not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the receptionist!!!", receptionistData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { receptionistId: string } }) {
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

        const { receptionistId } = params;

        const data: ReceptionistFormInputEdit = await req.json();
        const parsedInput = receptionistFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        if (parsedInput.data.shift || parsedInput.data.deskNumber) {
            const receptionistData = await prisma.receptionist.update({
                where: {
                    id: receptionistId,
                },
                data: {
                    ...(parsedInput.data.shift && { shift: parsedInput.data.shift }),
                    ...(parsedInput.data.deskNumber && { deskNumber: parsedInput.data.deskNumber }),
                }
            });

            return Response.json({ message: "Successfully updated the receptionist!!!", receptionistData }, { status: 200 });
        }

        const foundReceptionist = await prisma.receptionist.findUnique({
            where: {
                id: receptionistId,
            }
        });

        if (!foundReceptionist) {
            return Response.json({ message: "Receptionist not found!!!" }, { status: 404 });
        }

        const receptionistData = await prisma.user.update({
            where: {
                id: foundReceptionist.id,
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

        return Response.json({ message: "Successfully updated the receptionist!!!", receptionistData }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return Response.json({ message: "Receptionist not found!!!" }, { status: 404 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { receptionistId: string } }) {
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

        const { receptionistId } = params;

        const foundReceptionist = await prisma.receptionist.findUnique({
            where: {
                id: receptionistId,
            }
        });

        if (!foundReceptionist) {
            return Response.json({ message: "Receptionist not found!!!" }, { status: 404 });
        }

        await prisma.user.delete({
            where: {
                id: foundReceptionist.id,
                receptionist: {
                    id: receptionistId
                }
            }
        });

        return Response.json({ message: "Successfully deleted the receptionist!!!" }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};