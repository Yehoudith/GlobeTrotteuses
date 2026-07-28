import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { db } from "./db.js";
import usersRoutes from "./src/routes/users.js";
import travelRouter from "./src/routes/travel.js";
import cors from 'cors';

// Charger les variables du fichier .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser les requêtes du frontend
app.use(cors());

// Permettre à Express de lire le JSON envoyé dans req.body
app.use(express.json());
app.use(cors()) 


// Route de test du serveur
app.get("/", (req, res) => {
  return res.send("Backend OK");
});

// Route de test de la base de données
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(
      "Erreur de connexion à la base de données :",
      error
    );

    return res.status(500).json({
      message: "Erreur de connexion à la base de données",
    });
  }
});

// routes travels
app.use("/travel", travelRouter)
//

// // Routes liées aux voyages
// app.use("/travel", travelRouter);

// Routes liées aux utilisateurs
app.use("/users", usersRoutes);

// Route inexistante
app.use((req, res) => {
  return res.status(404).json({
    message: "Route introuvable",
  });
});

// Gestion générale des erreurs
app.use((error, req, res, next) => {
  console.error("Erreur serveur :", error);

  return res.status(500).json({
    message: "Erreur interne du serveur",
  });
});

// Démarrage du serveur
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});