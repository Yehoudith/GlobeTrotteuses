import express from 'express'
import { loginController } from '../controllers/authentification.js';

const authRouter = express.Router()

authRouter.post("/login", loginController)

export default authRouter