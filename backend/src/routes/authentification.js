import express from 'express'
import { Pool } from 'pg'
import { db } from '../../db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authRouter = express.Router()

authRouter.post("/inscription", async (req, res) => {
    const { email, password } = req.body
    const hash = bcrypt.hashSync(password, 10)
    console.log(hash)
    res.send('ok')
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const hash1 = "$2b$10$h.9q9PEfLVpcjrGhPxR9SOLDRHTOqi/.7XXT9vhyULKhbRcSe39qO"
    const hash_ok = bcrypt.compareSync(password, hash1)
    console.log(hash_ok)
    if (hash_ok == true){
        const token = jwt.sign(
            {id : email},
            'secret'
        )
        res.send({ token })
    }
})

export default authRouter