import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Tarefa from "../../ui/tarefa";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    const id = params.id;

    return (
        <>
            <main className="flex items-center justify-center min-h-screen">
                <Tarefa email={session?.user?.email || ""} update={true} tarefaId={id} />
            </main>
        </>
    );
}
