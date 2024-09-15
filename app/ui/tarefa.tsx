"use client";

import Input from "./Input";
import Label from "./Label";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Tarefa({
    email,
    update,
    tarefaId,
}: {
    email: string;
    update: boolean;
    tarefaId?: string;
}) {
    const [membroId, setMembroId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const payload = update
                ? {
                      id: tarefaId,
                      nome: nome.trim(),
                      descricao: descricao.trim(),
                      prioridade: prioridade.trim(),
                  }
                : {
                      membroId,
                      nome: nome.trim(),
                      descricao: descricao.trim(),
                      prioridade: prioridade.trim(),
                  };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/tarefa/${
                    update ? "update" : "create"
                }`,
                {
                    method: update ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await response.json();
            if (response.ok) {
                alert(
                    `Tarefa ${
                        update ? "atualizada" : "cadastrada"
                    } com sucesso!`
                );
                setNome("");
                setDescricao("");
                setPrioridade("");
                if (update) {
                    router.push("/tarefas");
                }
            } else {
                console.log(data.error);
            }
        } catch (error) {
            alert(`Erro ao ${update ? "atualizar" : "cadastrar"} tarefa.`);
        }
    };

    const fetchMembroId = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/membro/email?email=${email}`
            );

            if (response.ok) {
                const data = await response.json();
                setMembroId(data.id);
            } else {
                alert("Erro ao buscar membro.");
            }
        } catch (error) {
            alert("Erro ao buscar membro.");
        }
    };

    const fetchTarefa = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/tarefa/get/${tarefaId}`
            );

            if (response.ok) {
                const data = await response.json();
                setNome(data.nome);
                setDescricao(data.descricao);
                setPrioridade(data.prioridade);
            } else {
                alert("Erro ao buscar tarefa.");
            }
        } catch (error) {
            alert("Erro ao buscar tarefa.");
        }
    };

    useEffect(() => {
        fetchMembroId();
        if (update) fetchTarefa();
    }, []);

    return (
        <section className="flex flex-col items-center justify-center h-full w-full">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col h-2/3 w-1/3 p-6"
            >
                <h1 className="font-bold mb-12 w-full text-center text-3xl">
                    {update ? "Atualizar Tarefa" : "Cadastrar Tarefa"}
                </h1>
                <Label label="Nome">
                    <Input
                        name="nome"
                        type="text"
                        pattern=".{5,50}"
                        placeholder="Nome da tarefa"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onInvalid={(e) => {
                            const target = e.target as HTMLInputElement;

                            if (target.validity.valueMissing) {
                                target.setCustomValidity(
                                    "Este campo é obrigatório."
                                );
                            } else if (target.validity.patternMismatch) {
                                target.setCustomValidity(
                                    "O nome deve ter entre 5 e 50 caracteres."
                                );
                            } else {
                                target.setCustomValidity("");
                            }
                        }}
                        required
                    ></Input>
                </Label>
                <Label label="Descrição">
                    <Input
                        name="descricao"
                        type="textarea"
                        placeholder="Descrição da tarefa"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        onInvalid={(e) => {
                            const target = e.target as HTMLInputElement;

                            if (target.validity.valueMissing) {
                                target.setCustomValidity(
                                    "Este campo é obrigatório."
                                );
                            } else {
                                target.setCustomValidity("");
                            }
                        }}
                    ></Input>
                </Label>
                <Label label="Prioridade">
                    <Input
                        name="prioridade"
                        type="text"
                        pattern="^(BAIXA|M[EÉ]DIA|ALTA|baixa|m[eé]dia|alta)$"
                        placeholder="Prioridade da tarefa"
                        value={prioridade}
                        onChange={(e) => {
                            if (
                                e.target.value === "média" ||
                                e.target.value === "MÉDIA"
                            ) {
                                setPrioridade("MEDIA");
                            } else {
                                setPrioridade(e.target.value);
                            }
                        }}
                        onInvalid={(e) => {
                            const target = e.target as HTMLInputElement;

                            if (target.validity.valueMissing) {
                                target.setCustomValidity(
                                    "Este campo é obrigatório."
                                );
                            } else if (target.validity.patternMismatch) {
                                target.setCustomValidity(
                                    "A prioridade deve ser BAIXA, MÉDIA ou ALTA."
                                );
                            } else {
                                target.setCustomValidity("");
                            }
                        }}
                        required
                    ></Input>
                </Label>
                <button
                    type="submit"
                    className="font-bold w-full bg-sky-500 text-white p-2 rounded mt-2 focus:outline-none"
                >
                    {update ? "Atualizar" : "Cadastrar"}
                </button>
                {update && (
                    <button
                        className="font-bold w-full bg-red-500 text-white p-2 rounded mt-2 focus:outline-none"
                        onClick={async (e) => {
                            e.preventDefault();
                            const response = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/tarefa/delete`,
                                {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        id: tarefaId,
                                    }),
                                }
                            );

                            if (response.ok) {
                                alert("Tarefa excluída com sucesso!");
                                router.push("/tarefas");
                            } else {
                                alert("Erro ao excluir tarefa.");
                            }
                        }}
                    >
                        Excluir
                    </button>
                )}
            </form>
            <Link
                href={"/tarefas"}
                className="font-light hover:underline decoration-gray-500 cursor-pointer text-gray-500"
            >
                Voltar para a Lista de Tarefas
            </Link>
        </section>
    );
}
