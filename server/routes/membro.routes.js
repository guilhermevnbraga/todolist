import express from 'express';
import { createMembro, login } from '../controllers/membroController.js';

const membroRouter = express.Router();

membroRouter.post('/create', createMembro);
membroRouter.post('/login', login);

export default membroRouter;
