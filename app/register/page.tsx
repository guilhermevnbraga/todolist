"use client";

import Input from "../ui/register/Input";
import Label from "../ui/register/Label";
import { useState } from "react";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center h-full w-full">
                <form className="flex flex-col h-2/3 w-1/3 p-6">
                    <h1 className="font-bold mb-12 w-full text-center text-3xl">
                        Crie sua conta e organize suas tarefas!
                    </h1>
                    <Label label="Nome:">
                        <Input
                            type="text"
                            name="name"
                            pattern=".{5,50}"
                            placeholder="Escreva o seu nome"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Label>
                    <Label label="Email:">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Digite seu email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Label>
                    <Label label="Senha:">
                        <Input
                            type="password"
                            name="password"
                            pattern=".{3,}"
                            title="A senha precisa ter no mínimo 3 caracteres"
                            placeholder="Crie uma senha"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Label>
                    <Label label="Confirme a Senha:">
                        <Input
                            type="password"
                            name="cpassword"
                            pattern={password}
                            title="As senhas não coincidem"
                            placeholder="Confirme sua senha"
                            onChange={(e) => setCPassword(e.target.value)}
                            required
                        />
                    </Label>
                    <button
                        type="submit"
                        className="font-bold w-full bg-blue-500 text-white p-2 rounded mt-2"
                    >
                        Registrar
                    </button>
                </form>
                {/*<button className="font-light hover:underline decoration-gray-500 cursor-pointer text-gray-500">Already have an account?</button> */}
            </div>
        </main>
    );
}
