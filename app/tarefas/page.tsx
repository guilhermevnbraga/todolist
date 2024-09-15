import Header from "../ui/tarefas/header";
import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession();
    return (
        <main>
            <Header name={session?.user?.name || ""}></Header>
        </main>
    );
}
