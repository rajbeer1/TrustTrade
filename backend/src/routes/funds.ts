import express from 'express';
import { isLoggedIn } from '../middleware';
import { AddFunds } from '../controllers';
export const fundsRouter = express.Router();
fundsRouter.post('/add',isLoggedIn,AddFunds)