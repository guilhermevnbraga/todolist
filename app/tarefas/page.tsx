import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientPage from "../ui/tarefas/clientPage";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
}

  return (
    <main className="flex flex-col min-h-screen">
      <ClientPage name={session?.user?.name || ""} email={session?.user?.email || ""} />
    </main>
  );
}
