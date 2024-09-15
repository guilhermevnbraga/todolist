import express from 'express';
import { createMembro, login, getMembroByEmail, deleteMembro } from '../controllers/membroController.js';

const membroRouter = express.Router();

membroRouter.get('/email/:email', getMembroByEmail);
membroRouter.post('/create', createMembro);
membroRouter.post('/login', login);
membroRouter.delete('/delete', deleteMembro);

export default membroRouter;
