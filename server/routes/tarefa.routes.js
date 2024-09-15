import express from 'express';
import { createTarefa, getTarefas, getTarefaById, updateTarefa, deleteTarefa } from '../controllers/tarefaController.js';

const tarefaRouter = express.Router();

tarefaRouter.get('/list', getTarefas);
tarefaRouter.get('/get/:id', getTarefaById);
tarefaRouter.post('/create', createTarefa);
tarefaRouter.patch('/update', updateTarefa);
tarefaRouter.delete('/delete', deleteTarefa);

export default tarefaRouter;