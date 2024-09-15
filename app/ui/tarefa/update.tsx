"use client";

import { useEffect, useState } from "react";
import Input from "../Input";
import Label from "../Label";

interface Tarefa {
    id: number;
    membroId: string;
    nome: string;
    descricao: string;
    abrirDescricao: boolean;
    finalizada: boolean;
    dataTermino: string;
    prioridade: string;
}

export default function Update({ email, id }: { email: string; id: string }) {
    const [membroId, setMembroId] = useState("");
    const [tarefa, setTarefa] = useState<Tarefa>({
        id: 0,
        membroId: "",
        nome: "",
        descricao: "",
        abrirDescricao: false,
        finalizada: false,
        dataTermino: "",
        prioridade: "",
    });

    const fetchMembro = async () => {
        const response = await fetch(`/membro/email/${email}`);
        const data = await response.json();
        setMembroId(data.id);
    };

    const fecthTarefa = async () => {
        const response = await fetch(`/tarefa/:${id}`);
        const data = await response.json();
        setTarefa(data);
    };

    useEffect(() => {
        fetchMembro();
        fecthTarefa();
    }, [email]);

    return (
        <>
            <main className="flex items-center justify-center min-h-screen">
                <h1>Atualizar Tarefa</h1>
            </main>
        </>
    );
}
