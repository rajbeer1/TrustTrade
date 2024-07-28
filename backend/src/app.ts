import express from 'express'
import cors from 'cors'
import {errorHandler} from './helpers'
import { authRouter, fundsRouter, transRouter } from './routes/';
import { createRouteHandler } from 'uploadthing/express';

export const app = express();


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the TrustTrade' });
});
app.use('/auth', authRouter)
app.use('/transact', transRouter)
app.use('/funds',fundsRouter)
app.use(errorHandler);