import prisma from "@/db";
import bcrypt from "bcryptjs";
import { Prisma } from "@/db/generated/prisma";
import { verifyUser } from "@/lib/apiAuth";
import { NextRequest } from "next/server";
import { ReceptionistFormInput, receptionistFormInput } from "@/utils/validators/receptionistInput";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allReceptionists = await prisma.receptionist.findMany({});

        if (allReceptionists.length <= 0) {
            return Response.json({ message: "Receptionists not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all receptionists!!!", allReceptionists }, { status: 200 });
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

        const data: ReceptionistFormInput = await req.json();
        const parsedInput = receptionistFormInput.safeParse(data);

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
                role: "RECEPTIONIST",
                mobileNo: parsedInput.data.mobileNo,
                ...(parsedInput.data.address && { address: parsedInput.data.address }),
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                receptionist: {
                    create: {
                        shift: parsedInput.data.shift,
                        ...(parsedInput.data.deskNumber && { deskNumber: parsedInput.data.deskNumber }),
                    }
                }
            }
        });

        return Response.json({ message: "Successfully created the receptionist!!!" }, { status: 201 });
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