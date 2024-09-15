import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Tarefa from "../ui/tarefa";

export default async function Page() {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    return (
        <>
            <main className="flex items-center justify-center min-h-screen">
                <Tarefa email={session?.user?.email || ""} update={false} />
            </main>
        </>
    );
}
