import express from 'express'
import { login } from '../controllers/authentification.js';

const authRouter = express.Router()

authRouter.post("/login", login)

export default authRouter