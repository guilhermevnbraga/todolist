import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../ui/home/header";
import Image from "next/image";
import fichario from "../ui/imgs/fichario.webp";

export default async function Page() {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    return (
        <>
            <main className="flex flex-col min-h-screen">
                <Header name={session?.user?.name || ""}></Header>
                <section className="flex w-full h-full items-center grow">
                    <article className="w-1/2 flex flex-col items-center">
                        <h1 className="text-5xl font-bold mb-4">Bem vindo ao To Do List</h1>
                        <span className="text-xl text-gray-400 font-bold">Organize suas tarefas de forma eficiente e produtiva!</span>
                    </article>
                    <figure className="w-1/2 flex justify-center">
                        <Image
                            src={fichario}
                            width={999}
                            height={999}
                            alt="fichario"
                            className="w-2/3"
                        ></Image>
                    </figure>
                </section>
            </main>
        </>
    );
}
