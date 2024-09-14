import express from 'express';
import { createTarefa, getTarefas } from '../controllers/tarefaController.js';

const tarefaRouter = express.Router();

tarefaRouter.post('/create', createTarefa);
tarefaRouter.get('/list', getTarefas);

export default tarefaRouter;