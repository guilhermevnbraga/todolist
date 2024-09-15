'use client'

import { useEffect, useState } from "react";
import Input from "../Input";
import Label from "../Label";

export default function Update({ email }: { email: string }) {
    const [membroId, setMembroId] = useState('');

    const fetchMembro = async () => {
        const response = await fetch(`/membro/email?email=${email}`);
        const data = await response.json();
        setMembroId(data.id);
    };

    const fecthTarefa = async () => {
        const response = await fetch(`/tarefa/${membroId}`);
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        fetchMembro();
    }, [email]);

    return (
        <>
            <main className="flex items-center justify-center min-h-screen">
                <h1>Atualizar Tarefa</h1>
            </main>
        </>
    );
}
