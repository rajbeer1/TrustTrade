import express from 'express'
import { loginBusiness, registerBusiness } from '../controllers';

export const authRouter = express.Router();
authRouter.post('/register',registerBusiness).post('/login',loginBusiness)