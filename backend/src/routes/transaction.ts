import express from 'express';

import { isLoggedIn } from '../middleware';
import { getBuyerTransaction, initiateTransaction ,getSellerTransaction} from '../controllers';

export const transRouter = express.Router();
transRouter.post('/new', isLoggedIn, initiateTransaction).get('/buyer', isLoggedIn, getBuyerTransaction).get('/seller', isLoggedIn, getSellerTransaction)
