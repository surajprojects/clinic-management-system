import { UserData } from "./userType";

export interface ReceptionistData {
    id: string,
    shift: string,
    deskNumber: string,
    isActive: boolean,
    userId: string,
    user: UserData,
    createdAt: string,
    updatedAt: string,
};

export type ReceptionistsList = ReceptionistData[];