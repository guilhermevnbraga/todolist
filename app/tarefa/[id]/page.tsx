import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    const id = params.id;

    return (
        <>
            <main className="flex items-center justify-center min-h-screen">
                <h1>Tarefa {id}</h1>
            </main>
        </>
    );
}