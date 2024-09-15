"use client";

import Input from "./ui/account/Input";
import Label from "./ui/account/Label";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const errorRef = useRef<HTMLSpanElement>(null);
    const router = useRouter();

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center h-full w-full">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            const result = await signIn("credentials", {
                                email,
                                password,
                                redirect: false,
                            });

                            if (result?.error) {
                                if (errorRef.current) {
                                    errorRef.current.textContent = "Email ou senha inválidos.";
                                }
                            } else {
                                if (errorRef.current) {
                                    errorRef.current.textContent = "";
                                }
                                router.push('/home');
                            }
                        } catch (error) {
                            console.error(error);
                            if (errorRef.current) {
                                errorRef.current.textContent =
                                    "Ocorreu um erro. Tente novamente.";
                            }
                        }
                    }}
                    className="flex flex-col h-2/3 w-1/3 p-6"
                >
                    <h1 className="font-bold mb-12 w-full text-center text-3xl">
                        Faça login e organize suas tarefas!
                    </h1>
                    <Label label="Email:">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Digite seu email"
                            onChange={(e) => {
                                setEmail(e.target.value.trim());
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
                            placeholder="Digite sua senha"
                            onChange={(e) => {
                                setPassword(e.target.value.trim());
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
                    <span ref={errorRef} className="w-full text-red-400 font-bold text-sm"></span>
                    <button
                        type="submit"
                        className="font-bold w-full bg-sky-500 text-white p-2 rounded mt-2 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
                <Link
                    href={"/cadastro"}
                    className="font-light hover:underline decoration-gray-500 cursor-pointer text-gray-500"
                >
                    Ainda não possui uma conta?
                </Link>
            </div>
        </main>
    );
}
