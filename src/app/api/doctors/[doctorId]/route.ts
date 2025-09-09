import prisma from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { Prisma } from "@/db/generated/prisma";
import { DoctorFormInputEdit, doctorFormInputEdit } from "@/utils/validators/doctorInput";

export async function GET(req: NextRequest,
    { params }: { params: Promise<{ doctorId: string }> }
) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { doctorId } = await params;

        const doctorData = await prisma.doctor.findUnique({
            where: {
                id: doctorId,
                isActive: true,
            },
            include: {
                user: true,
                patients: true,
            }
        });

        if (!doctorData) {
            return Response.json({ message: "Doctor not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the doctor!!!", doctorData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest,
    { params }: { params: Promise<{ doctorId: string }> }
) {
    try {
        const token = await verifyUser(req, ["ADMIN"]);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { doctorId } = await params;

        const data: DoctorFormInputEdit = await req.json();
        const parsedInput = doctorFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            console.log(parsedInput.error.issues)
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        if (parsedInput.data.registrationNo || parsedInput.data.specialization || parsedInput.data.verified || parsedInput.data.yearOfExperience) {
            const doctorData = await prisma.doctor.update({
                where: {
                    id: doctorId,
                    isActive: true,
                },
                data: {
                    ...(parsedInput.data.registrationNo && { registrationNo: parsedInput.data.registrationNo }),
                    ...(parsedInput.data.yearOfExperience && { yearOfExperience: parsedInput.data.yearOfExperience }),
                    ...(parsedInput.data.specialization && { specialization: parsedInput.data.specialization }),
                    ...(parsedInput.data.verified && { verified: parsedInput.data.verified }),
                }
            });

            return Response.json({ message: "Successfully updated the doctor!!!", doctorData }, { status: 200 });
        }

        const foundDoctor = await prisma.doctor.findUnique({
            where: {
                id: doctorId,
                isActive: true,
            }
        });

        if (!foundDoctor) {
            return Response.json({ message: "Doctor not found!!!" }, { status: 404 });
        }

        const doctorData = await prisma.user.update({
            where: {
                id: foundDoctor.id,
                role: "DOCTOR",
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

        return Response.json({ message: "Successfully updated the doctor!!!", doctorData }, { status: 200 });
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

export async function DELETE(req: NextRequest,
    { params }: { params: Promise<{ doctorId: string }> }
) {
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

        const { doctorId } = await params;

        // soft delete to maintain other related records
        await prisma.doctor.update({
            where: {
                id: doctorId,
            },
            data: {
                isActive: false,
            }
        });

        return Response.json({ message: "Successfully deleted the doctor!!!" }, { status: 200 });
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