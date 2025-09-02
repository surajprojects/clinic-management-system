import { redirect } from "next/navigation";
import { getSessionOrRedirect } from "@/lib/auth";

export default async function PostLogin() {
    const session = await getSessionOrRedirect();

    switch (session.user?.role) {
        case "DOCTOR":
            redirect("/doctors/dashboard");
        case "RECEPTIONIST":
            redirect("/receptionists/dashboard");
        case "ADMIN":
            redirect("/admin/dashboard");
        default:
            redirect("/");
    }
};