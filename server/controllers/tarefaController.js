import { prisma } from "../models/prismaClient.js";

export async function createTarefa(req, res) {
    const { membroId, nome, descricao, prioridade } = req.body;
    try {
        const novaTarefa = await prisma.tarefa.create({
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
    const { membroId } = req.query;
    try {
        let tarefas;
        if (membroId) {
            tarefas = await prisma.tarefa.findMany({
                where: {
                    membroId,
                },
            });
        } else {
            tarefas = await prisma.tarefa.findMany();
        }
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
