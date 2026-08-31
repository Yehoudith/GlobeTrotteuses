import express from 'express'
import { Pool } from 'pg'
import { db } from '../../db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { login } from '../controllers/authentification.js';

const authRouter = express.Router()

authRouter.post("/login", login)


export default authRouter