import { prisma } from '../models/prismaClient.js';

export async function createMembro(req, res) {
  const { nome, email } = req.body;
  try {
    const novoMembro = await prisma.membro.create({
      data: {
        email,
        nome,
      },
    });

    res.status(201).json(novoMembro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
