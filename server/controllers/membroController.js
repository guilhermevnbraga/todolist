import { prisma } from "../models/prismaClient.js";
import bcrypt from "bcrypt";

export async function createMembro(req, res) {
    const { nome, email, senha } = req.body;
    try {
        await prisma.membro.create({
            data: {
                email,
                nome,
                senha: await bcrypt.hash(senha, 10),
            },
        });

        res.status(201).json({ message: "Membro criado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    const { email, senha } = req.body;
    try {
        const membro = await prisma.membro.findUnique({
            where: { email },
        });

        if (!membro) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const senhaCorreta = await bcrypt.compare(senha, membro.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        res.status(200).json({ message: "Login realizado com sucesso", user: membro });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
