"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function Tarefas({
    email,
    targetEmail,
}: {
    email: string;
    targetEmail: string;
}) {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const router = useRouter();

    const fetchMembro = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/membro/email?email=${email}`
        );
        const data = await response.json();
        return data;
    };

    const fetchTarefas = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tarefa/list`
        );
        const data = await response.json();
        setTarefas(data);
    };

    const fetchTarefasByMembro = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tarefa/list?email=${targetEmail}`
        );
        const data = await response.json();
        console.log(data);
        if (data.error) {
            setTarefas([
                {
                    id: 0,
                    membroId: "",
                    nome: data.error,
                    descricao: "",
                    abrirDescricao: false,
                    finalizada: true,
                    dataTermino: "",
                    prioridade: "Nulo",
                },
            ]);
        } else {
            setTarefas(data);
        }
    };

    useEffect(() => {
        fetchMembro();
        fetchTarefas();
    }, []);

    useEffect(() => {
        console.log(targetEmail);
        fetchTarefasByMembro();
    }, [targetEmail]);

    return (
        <section className="w-full flex p-4">
            <ul className="grid grid-cols-6 gap-4 w-full">
                {tarefas.map((tarefa) => {
                    if (tarefa.prioridade === "MEDIA") {
                        tarefa.prioridade = "Média";
                    } else {
                        tarefa.prioridade =
                            tarefa.prioridade
                                .toLowerCase()
                                .charAt(0)
                                .toUpperCase() + tarefa.prioridade.slice(1);
                    }
                    return (
                        <li
                            key={tarefa.id}
                            className="flex h-fit grow justify-center"
                        >
                            <button
                                className="bg-orange-200 text-gray-800 p-4 text-left min-w-full rounded-xl"
                                onClick={() => {
                                    tarefa.abrirDescricao
                                        ? (tarefa.abrirDescricao =
                                              !tarefa.abrirDescricao)
                                        : (tarefa.abrirDescricao = true);
                                    router.refresh();
                                }}
                            >
                                <h2 className="text-center mb-4 font-bold text-lg ">
                                    {tarefa.nome}
                                </h2>
                                {tarefa.abrirDescricao && (
                                    <p className="mb-4">{`Descrição: ${tarefa.descricao}`}</p>
                                )}
                                <p>{`Prioridade: ${tarefa.prioridade}`}</p>
                                <p>
                                    {`Situação: ${
                                        tarefa.finalizada
                                            ? "Finalizada"
                                            : "Pendente"
                                    }`}
                                </p>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
