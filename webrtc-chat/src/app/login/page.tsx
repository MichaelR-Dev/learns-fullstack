import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

export default function Login(){

    return (
        <>
            <div className="flex min-h-screen min-w-screen flex-col justify-around items-center p-5 px-10">
                <main>
                    <LoginForm/>
                    <Footer/>
                </main>
            </div>
        </>
    );
}