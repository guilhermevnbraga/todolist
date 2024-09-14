import express from 'express';
import { createTarefa } from '../controllers/tarefaController.js';

const tarefaRouter = express.Router();

tarefaRouter.post('/create', createTarefa);

export default tarefaRouter;