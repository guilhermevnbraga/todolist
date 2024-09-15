import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Cadastro from "../ui/cadastroTarefa/cadastro";

export default async function Page() {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    return (
        <>
            <main className="flex items-center justify-center min-h-screen">
                <Cadastro email={session?.user?.email || ""} update={false} />
            </main>
        </>
    );
}
