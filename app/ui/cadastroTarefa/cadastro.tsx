"use client";

import Input from "../Input";
import Label from "../Label";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Cadastro({ email }: { email: string }) {
    const [membroId, setMembroId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/tarefa/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        membroId,
                        nome,
                        descricao,
                        prioridade,
                    }),
                }
            );
            const data = await response.json();
            console.log(prioridade);
            if (response.ok) {
                alert("Tarefa cadastrada com sucesso!");
                setNome("");
                setDescricao("");
                setPrioridade("");
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Erro ao cadastrar tarefa.");
        }
    };

    const fetchMembroId = async () => {
        try {
            console.log(email);
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

    useEffect(() => {
        fetchMembroId();
    }, []);

    return (
        <section className="flex flex-col items-center justify-center h-full w-full">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col h-2/3 w-1/3 p-6"
            >
                <h1 className="font-bold mb-12 w-full text-center text-3xl">
                    Cadastre uma nova tarefa!
                </h1>
                <Label label="Nome">
                    <Input
                        name="nome"
                        type="text"
                        pattern=".{5,50}"
                        placeholder="Nome da tarefa"
                        onChange={(e) => setNome(e.target.value.trim())}
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
                        onChange={(e) => setDescricao(e.target.value.trim())}
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
                        required
                    ></Input>
                </Label>
                <Label label="Prioridade">
                    <Input
                        name="prioridade"
                        type="text"
                        pattern="^(BAIXA|M[EÉ]DIA|ALTA|baixa|m[eé]dia|alta)$"
                        placeholder="Prioridade da tarefa"
                        onChange={(e) => {
                            if (
                                e.target.value === "média" ||
                                e.target.value === "MÉDIA"
                            ) {
                                setPrioridade("MEDIA");
                            } else {
                                setPrioridade(e.target.value.trim());
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
                    Cadastrar
                </button>
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
