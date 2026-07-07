import express from 'express'
import { Pool } from 'pg'
import cors from 'cors'

const app = express()
const port = 3000

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "adatabase",
    password : "postgres",
    port : "5432"
})

app.use(express.json())
app.use(cors())

app.get('/check-travel', async (req, res)=> {
    const titre = req.body
    if (!titre) {
        return res.status(400).json({ error : 'Titre manquant'})
    }
    const result = await pool.query(`SELECT title FROM travels WHERE title = ${titre}`)
    console.log(result)
    if (result){
        return res.status(400).json({error : 'Le titre du voyage est déjà pris'})
    }
    res.send('ok')
})

// app.post('/create-travel', async (req, res) => {

// })

app.listen(port, () => {
    console.log("serveur Les Globetrotteuses lancé")
})