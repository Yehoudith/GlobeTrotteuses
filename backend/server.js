import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Serveur Lovelace Factory OK");
});

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});