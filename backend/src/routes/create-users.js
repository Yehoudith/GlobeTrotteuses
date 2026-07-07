import express from "express";
import { pool } from  "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.post("/user/check-email", async (req, res) => {
    const result = await db.query("SELECT email FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      console.log("Email inconnu");
    } else {
      console.log("email existe");
    }
    
  res.send("Serveur OK");
});

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});