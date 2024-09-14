import express from 'express';
import tarefaRouter from './routes/tarefa.routes.js';
import membroRouter from './routes/membro.routes.js';

const app = express();

app.use(express.json());
app.use('/tarefa', tarefaRouter);
app.use('/membro', membroRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});