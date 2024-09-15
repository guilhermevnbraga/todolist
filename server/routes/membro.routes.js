import express from 'express';
import { createMembro, login, getMembroByEmail } from '../controllers/membroController.js';

const membroRouter = express.Router();

membroRouter.post('/create', createMembro);
membroRouter.post('/login', login);
membroRouter.get('/email', getMembroByEmail);

export default membroRouter;
