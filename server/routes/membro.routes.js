import express from 'express';
import { createMembro } from '../controllers/membroController.js';

const membroRouter = express.Router();

membroRouter.post('/create', createMembro);

export default membroRouter;
