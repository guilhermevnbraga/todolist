import Header from "../ui/tarefas/header";
import Tarefas from "../ui/tarefas/tarefas";
import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession();
    return (
        <main className="flex flex-col min-h-screen">
            <Header name={session?.user?.name || ""}></Header>
            <Tarefas email={session?.user?.email || ""}></Tarefas>
        </main>
    );
}
