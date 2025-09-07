import { UserData } from "./userType";

export interface DoctorData {
    id: string,
    specialization: string,
    registrationNo: string,
    yearOfExperience: number,
    verified: boolean,
    isActive: boolean,
    userId: string,
    user: UserData,
    createdAt: string,
    updatedAt: string,
    patients: any[],
};

export type DoctorsList = DoctorData[];