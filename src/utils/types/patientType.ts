import { UserData } from "./userType";

export interface PatientData {
    id: string,
    isActive: boolean,
    userId: string,
    user: UserData,
    createdAt: string,
    updatedAt: string,
    doctors: any[],
    records: any[],
    invoices: any[],
    appointments: any[],
};

export type PatientsList = PatientData[];