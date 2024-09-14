import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../ui/home/header";

export default async function Page() {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    return (
        <>
            <Header name={session?.user?.name || ""}></Header>
            <main className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <h1 className="font-bold text-3xl">Home</h1>
                    <p className="text-lg">
                        Olá, {session?.user?.name}! Você está logado.
                    </p>
                </div>
            </main>
        </>
    );
}
