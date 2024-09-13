import express from 'express';
import { PrismaClient } from '@prisma/client';


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

async function createTarefa(nome, descricao, prioridade) {
  return await prisma.tarefa.create({
    data: {
      nome,
      descricao,
      prioridade,
    },
  });
}

app.post('/tarefas', async (req, res) => {
  const { nome, descricao, prioridade } = req.body;

  try {
    if (!nome) throw new Error('O parâmetro Nome é obrigatório');
    if (nome.length < 5) throw new Error('O parâmetro Nome deve ter no mínimo 5 caracteres');
    if (nome.length > 50) throw new Error('O parâmetro Nome deve ter no mmaximo 50 caracteres');
    if (!descricao) throw new Error('O parâmetro Descrição é obrigatório');
    if (descricao.length > 140) throw new Error('O parâmetro Descrição deve ter no máximo 140 caracteres');
    if (!['ALTA', 'MEDIA', 'BAIXA'].includes(prioridade.toUpperCase())) throw new Error('O parâmetro Prioridade deve ser um dos seguintes valores: ALTA, MEDIA, BAIXA');

    const novaTarefa = await createTarefa(nome, descricao, prioridade.toUpperCase());
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});