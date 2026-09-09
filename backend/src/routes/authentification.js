import express from 'express'
<<<<<<< HEAD
import { login } from '../controllers/authentification.js';
=======
import { loginController } from '../controllers/authentification.js';
>>>>>>> 08a9d6d6dd13a9b71539687211152f858c01796b

const authRouter = express.Router()

authRouter.post("/login", loginController)

export default authRouter