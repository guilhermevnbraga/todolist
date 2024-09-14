"use client";

import Input from "../ui/register/Input";
import Label from "../ui/register/Label";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/membro/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome: name,
                        email,
                        senha: password,
                    }),
                }
            );

            if (!response.ok) {
                throw await response.json();
            }

            const data = await response.json();
            console.log(data);

            await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center h-full w-full">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col h-2/3 w-1/3 p-6"
                >
                    <h1 className="font-bold mb-12 w-full text-center text-3xl">
                        Crie sua conta e organize suas tarefas!
                    </h1>
                    <Label label="Nome:">
                        <Input
                            type="text"
                            name="name"
                            pattern=".{5,50}"
                            placeholder="Escreva o seu nome"
                            onChange={(e) => {
                                setName(e.target.value);
                                e.target.setCustomValidity("");
                            }}
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
                        />
                    </Label>
                    <Label label="Email:">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Digite seu email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                e.target.setCustomValidity("");
                            }}
                            onInvalid={(e) => {
                                const target = e.target as HTMLInputElement;

                                if (target.validity.valueMissing) {
                                    target.setCustomValidity(
                                        "Este campo é obrigatório."
                                    );
                                } else if (target.validity.typeMismatch) {
                                    target.setCustomValidity(
                                        "Por favor, insira um email válido."
                                    );
                                } else {
                                    target.setCustomValidity("");
                                }
                            }}
                            required
                        />
                    </Label>
                    <Label label="Senha:">
                        <Input
                            type="password"
                            name="password"
                            pattern=".{3,}"
                            placeholder="Crie uma senha"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                e.target.setCustomValidity("");
                            }}
                            onInvalid={(e) => {
                                const target = e.target as HTMLInputElement;

                                if (target.validity.valueMissing) {
                                    target.setCustomValidity(
                                        "Este campo é obrigatório."
                                    );
                                } else if (target.validity.patternMismatch) {
                                    target.setCustomValidity(
                                        "A senha deve ter no mínimo 3 caracteres."
                                    );
                                } else {
                                    target.setCustomValidity("");
                                }
                            }}
                            required
                        />
                    </Label>
                    <Label label="Confirme a Senha:">
                        <Input
                            type="password"
                            name="cpassword"
                            pattern={password}
                            placeholder="Confirme sua senha"
                            onInvalid={(e) => {
                                const target = e.target as HTMLInputElement;

                                if (target.validity.valueMissing) {
                                    target.setCustomValidity(
                                        "Este campo é obrigatório."
                                    );
                                } else if (target.validity.patternMismatch) {
                                    target.setCustomValidity(
                                        "As senhas não coincidem."
                                    );
                                } else {
                                    target.setCustomValidity("");
                                }
                            }}
                            required
                        />
                    </Label>
                    <button
                        type="submit"
                        className="font-bold w-full bg-blue-500 text-white p-2 rounded mt-2 focus:outline-none"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </main>
    );
}
