import { prisma } from '../models/prismaClient.js';

export async function createTarefa(req, res) {

  const { nome, descricao, prioridade } = req.body;
  try {
    const novaTarefa = await prisma.tarefa.create({
      data: {
        nome,
        descricao,
        prioridade: prioridade?.toUpperCase() || 'BAIXA',
      },
    });

    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}