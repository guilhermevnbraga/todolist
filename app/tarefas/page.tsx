import { getServerSession } from "next-auth";
import ClientPage from "../ui/tarefas/clientPage";

export default async function Page() {
  const session = await getServerSession();

  return (
    <main className="flex flex-col min-h-screen">
      <ClientPage name={session?.user?.name || ""} email={session?.user?.email || ""} />
    </main>
  );
}
