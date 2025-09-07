import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import RegisterForm from "@/components/home/register";

export default function Register() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="my-16 flex flex-1 items-center justify-center">
                    <RegisterForm />
                </main>
                <Footer />
            </div>
        </>
    );
};