import { prisma } from "../models/prismaClient.js";

export async function createMembro(req, res) {
    const { name, email } = req.body;
    try {
        await prisma.membro.create({
            data: {
                email,
                nome: name,
            },
        });

        res.status(201).json({ message: "Membro criado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
