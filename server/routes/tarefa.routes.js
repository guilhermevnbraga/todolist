import express from 'express';
import { createTarefa, getTarefas, updateTarefa, deleteTarefa } from '../controllers/tarefaController.js';

const tarefaRouter = express.Router();

tarefaRouter.post('/create', createTarefa);
tarefaRouter.get('/list', getTarefas);
tarefaRouter.patch('/update', updateTarefa);
tarefaRouter.delete('/delete', deleteTarefa);

export default tarefaRouter;