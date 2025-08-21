import prisma from "@/db";
import bcrypt from "bcryptjs";
import { Prisma } from "@/db/generated/prisma";
import { verifyUser } from "@/lib/apiAuth";
import { NextRequest } from "next/server";
import { DoctorFormInput, doctorFormInput } from "@/utils/validators/doctorInput";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allDoctors = await prisma.doctor.findMany({
            where: {
                isActive: true,
            },
            include: {
                user: true,
                patients: true,
            }
        });

        if (allDoctors.length <= 0) {
            return Response.json({ message: "Doctors not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all doctors!!!", allDoctors }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
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

        const data: DoctorFormInput = await req.json();
        const parsedInput = doctorFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(parsedInput.data.password, 10);

        await prisma.user.create({
            data: {
                email: parsedInput.data.email,
                password: hashedPassword,
                name: parsedInput.data.name,
                dob: new Date(parsedInput.data.dob).toISOString(),
                gender: parsedInput.data.gender,
                role: "DOCTOR",
                mobileNo: parsedInput.data.mobileNo,
                ...(parsedInput.data.address && { address: parsedInput.data.address }),
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                doctor: {
                    create: {
                        registrationNo: parsedInput.data.registrationNo,
                        specialization: parsedInput.data.specialization,
                        yearOfExperience: parsedInput.data.yearOfExperience,
                        ...(parsedInput.data.verified && { verified: parsedInput.data.verified }),
                    }
                }
            }
        });

        return Response.json({ message: "Successfully created the doctor!!!" }, { status: 201 });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return Response.json({ message: "Email already exists!" }, { status: 409 });
        }
        else {
            console.log(error);
            return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};