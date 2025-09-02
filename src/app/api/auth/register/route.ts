import prisma from "@/db";
import bcrypt from "bcryptjs";
import { Prisma } from "@/db/generated/prisma";
import { PatientFormInput, patientFormInput } from "@/utils/validators/patientInput";

export async function POST(req: Request) {
    try {
        const data: PatientFormInput = await req.json();
        const parsedInput = patientFormInput.safeParse(data);

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
                role: "PATIENT",
                mobileNo: parsedInput.data.mobileNo,
                ...(parsedInput.data.address && { address: parsedInput.data.address }),
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
            }
        });

        return Response.json({ message: "Successfully created the patient!!!" }, { status: 201 });
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