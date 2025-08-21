import { Router } from 'express';
import { search } from '../controllers/search.controller.js';


export const searchRouter = Router();
searchRouter.post('/search', search);
