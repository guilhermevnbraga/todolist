"use client";

import { useState } from "react";
import Header from "./header";
import Tarefas from "./tarefas";

export default function ClientPage({ name, email }: { name: string; email: string }) {
  const [targetEmail, setTargetEmail] = useState("");

  return (
    <div>
      <Header name={name} membroEmail={email} setTargetEmail={setTargetEmail} />
      <Tarefas email={email} targetEmail={targetEmail} />
    </div>
  );
}
