import express from 'express';
import tarefaRouter from './routes/tarefa.routes.js';

const app = express();

app.use(express.json());
app.use('/tarefa', tarefaRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});