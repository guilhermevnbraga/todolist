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

        res.status(200).json({
            message: "Login realizado com sucesso",
            user: membro,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getMembroByEmail(req, res) {
    const { email } = req.params;
    try {
        const membro = await prisma.membro.findUnique({
            where: { email },
        });

        if (!membro) {
            throw new Error("Membro não encontrado");
        }

        res.status(200).json(membro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteMembro(req, res) {
    const { id } = req.body;
    try {
        const tarefas = await prisma.tarefa.findMany({
            where: { membroId: id },
        });

        if (tarefas.length) {
            await prisma.tarefa.deleteMany({
                where: { membroId: id },
            });
        }

        await prisma.membro.delete({
            where: { id },
        });

        res.status(200).json({ message: "Membro deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
