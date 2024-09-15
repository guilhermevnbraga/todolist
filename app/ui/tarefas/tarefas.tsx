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

export default function Tarefas({ email }: { email: string }) {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const router = useRouter();

    const fetchTarefas = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tarefa/list`
        );
        const data = await response.json();
        console.log(data);
        setTarefas(data);
    };

    useEffect(() => {
        fetchTarefas();
    }, []);

    return (
        <section className="w-full flex p-4">
            <ul className="grid grid-cols-5 gap-4 w-full">
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
                        <li key={tarefa.id} className="flex h-fit grow justify-center">
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