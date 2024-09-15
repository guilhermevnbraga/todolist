import { prisma } from "../models/prismaClient.js";

export async function createTarefa(req, res) {
    const { membroId, nome, descricao, prioridade } = req.body;
    try {
        await prisma.tarefa.create({
            data: {
                membroId,
                nome,
                descricao,
                prioridade: prioridade?.toUpperCase() || "BAIXA",
            },
        });

        res.status(201).json({ message: "Tarefa criada com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getTarefas(req, res) {
    const { email } = req.query;
    try {
        let tarefas;
        if (email) {
            const membro = await prisma.membro.findUnique({
                where: {
                    email,
                },
            });

            if (!membro) {
                throw new Error("Membro não encontrado");
            }

            tarefas = await prisma.tarefa.findMany({
                where: {
                    membroId: membro.id,
                },
            });

            if (!tarefas.length) {
                throw new Error("Nenhuma tarefa encontrada");
            }
        } else {
            tarefas = await prisma.tarefa.findMany();
        }
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
