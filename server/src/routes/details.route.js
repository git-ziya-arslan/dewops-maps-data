import { Router } from 'express';
import { detailsOne } from '../controllers/details.controller.js';


export const detailsRouter = Router();
detailsRouter.get('/details', detailsOne);
