"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
    const [userId, setUserId] = useState<string>("");
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const router = useRouter();

    const fetchMembro = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/membro/email?email=${email}`
        );
        const data = await response.json();
        setUserId(data.id);
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

    const handleFinalizeTarefa = async (id: number) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tarefa/update`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    finalizada: true,
                }),
            }
        );
        const data = await response.json();
    };

    const handleDeleteTarefa = async (id: number) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tarefa/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                }),
            }
        );
        const data = await response.json();

    useEffect(() => {
        fetchMembro();
        fetchTarefas();
    }, []);

    useEffect(() => {
        fetchTarefasByMembro();
    }, [targetEmail]);

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
                        <li
                            key={tarefa.id}
                            className="flex h-fit grow justify-center"
                        >
                            <button
                                className={`bg-orange-200 text-gray-800 p-4 text-left min-w-full rounded-xl ${
                                    tarefa.abrirDescricao &&
                                    "hover:scale-100 active:scale-100"
                                }`}
                                onClick={() => {
                                    tarefa.abrirDescricao
                                        ? (tarefa.abrirDescricao =
                                              !tarefa.abrirDescricao)
                                        : (tarefa.abrirDescricao = true);
                                    router.refresh();
                                }}
                            >
                                <section>
                                    {tarefa.membroId === userId &&
                                        tarefa.abrirDescricao && (
                                            <>
                                                {!tarefa.finalizada && (
                                                    <Link href={`/tarefa/${tarefa.id}`} className=" float-left mr-3">
                                                        <PencilIcon className="w-6 h-6" />
                                                    </Link>
                                                )}
                                                <button className=" float-right ml-3" onClick={(e) => {
                                                    e.preventDefault();
                                                    setTarefas(tarefas.filter((t) => t.id !== tarefa.id));
                                                    handleDeleteTarefa(tarefa.id);
                                                }}>
                                                    <TrashIcon className="w-6 h-6" />
                                                </button>
                                            </>
                                        )}
                                    <h2 className="text-center mb-4 font-bold text-lg ">
                                        {tarefa.nome}
                                    </h2>
                                </section>
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
                                    {tarefa.membroId === userId &&
                                        tarefa.abrirDescricao &&
                                        !tarefa.finalizada && (
                                            <button
                                                className="float-right"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    tarefa.finalizada = true;
                                                    handleFinalizeTarefa(
                                                        tarefa.id
                                                    );
                                                }}
                                            >
                                                <CheckIcon className="w-6 h-6" />
                                            </button>
                                        )}
                                </p>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
