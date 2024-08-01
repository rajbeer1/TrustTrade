import express from 'express';

import { isLoggedIn } from '../middleware';
import { getBuyerTransaction, initiateTransaction ,getSellerTransaction, Search, getPendingTransactions, approvePendingTransactions, claims, claimtransaction, makeclaim} from '../controllers';

export const transRouter = express.Router();
transRouter.post('/new', isLoggedIn, initiateTransaction).get('/buyer', isLoggedIn, getBuyerTransaction).get('/seller', isLoggedIn, getSellerTransaction).post('/search', Search).get('/pending', isLoggedIn, getPendingTransactions).post("/approve",approvePendingTransactions).post('/claim',isLoggedIn,claims).get('/transactions/:userEmail',claimtransaction).post('/makeclaim',makeclaim)
