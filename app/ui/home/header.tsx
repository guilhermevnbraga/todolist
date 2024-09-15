"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function Header({ name }: { name: string }) {
    const [open, setOpen] = useState(false);
    return (
        <header className="flex items-center justify-between p-4 bg-sky-700 text-white">
            <h1 className="font-bold text-2xl mr-12">To Do List</h1>
            <nav className="flex grow justify-between">
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link className="hover:underline" href="/tarefas">
                            Lista de Tarefas
                        </Link>
                    </li>
                    <li>
                        <button
                            className="hover:underline"
                            onClick={() =>
                                signOut({ callbackUrl: "/cadastro" })
                            }
                        >
                            Cadastrar Novo Membro
                        </button>
                    </li>
                </ul>
                <ul className="flex flex-col grow items-end">
                    <li>
                        <button
                            className="text-xl font-bold hover:underline text-end w-full"
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >{`Olá ${name}!`}</button>
                    </li>
                    {open && (
                        <li className="absolute top-12 right-0 font-bold bg-sky-700 w-[10%] 2xl:w-[7%] p-2 text-right text-sm">
                            <nav className="flex flex-col">
                                <ul>
                                    <li
                                        onClick={() => signOut()}
                                        className="hover:cursor-pointer"
                                    >
                                        Sair
                                    </li>
                                </ul>
                            </nav>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
