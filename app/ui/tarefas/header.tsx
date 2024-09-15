"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Header({
    name,
    setTargetEmail,
}: {
    name: string;
    setTargetEmail: (email: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <header className="flex items-center justify-between p-4 bg-sky-700 text-white">
            <nav className="flex grow justify-between">
                <ul className="flex space-x-4 w-1/3 items-center">
                    <li>
                        <Link href="/home" className="font-bold text-2xl mr-3">
                            To Do List
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:underline" href="/">
                            Cadastrar Nova Tarefa
                        </Link>
                    </li>
                </ul>
                <section className="flex w-1/3 rounded-xl items-center border-2">
                    <MagnifyingGlassIcon className="w-6 h-6 ml-1 mr-1" />
                    <input
                        type="text"
                        className="text-black w-11/12 h-full focus:outline-none px-1"
                        placeholder="Pesquisar Membro por Email"
                        onChange={(e) => setEmail(e.target.value.trim())}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setTargetEmail(email);
                        }}
                    />
                </section>
                <ul className="flex flex-col w-1/3 items-end">
                    <li>
                        <button
                            className="text-xl font-bold hover:underline text-end w-full"
                            onClick={() => setOpen(!open)}
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
