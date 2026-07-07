
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
  res.status(200).json([
    { id: 1, title: "Reserver l hotel", status: "a_faire" },
    { id: 2, title: "Acheter les billets", status: "en_cours" }
  ]);
});

app.listen(3000, () => {
  console.log("Serveur lance sur le port 3000");
});