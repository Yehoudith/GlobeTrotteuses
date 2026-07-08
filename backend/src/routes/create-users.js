import express from "express";
import { pool } from  "pg";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/user/check-email", async (req, res) => {
    const result = await pool.query(`SELECT email FROM users WHERE users = ${user}`)
    if (!result) {
        return res.status(200).json({"Email non trouvé, veuillez créer un compte"})
    }
  res.send("Serveur OK");
});

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});