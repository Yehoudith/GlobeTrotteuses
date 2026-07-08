import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import { db } from "../../db.js";
import bcrypt from "bcrypt";

dotenv.config();

const { Pool } = pg;

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/check-email", async (req, res) => {
  const { email } = req.body;
console.log(email);

  const result = await db.query(
    "SELECT email FROM Users WHERE email = $1",
    [email]
  );
  if (result.rows.length === 0) {
    console.log("Email inconnu");
    return res.json({ exists: false });
  } else {
    console.log("email existe");
    return res.json({ exists: true });
  }
  res.send("Serveur OK");
});

router.post("/create-user", async (req, res) => {
  try {
    const { name, surname, email, password, confirmPassword } = req.body;

    // 1. Vérifier les champs obligatoires
    if (!name || !surname || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    // 2. Vérifier que le prénom est assez long
    if (name.length < 2) {
      return res.status(400).json({
        message: "Le prénom doit contenir au moins 2 caractères",
      });
    }

    // 3. Vérifier que le nom est assez long
    if (surname.length < 2) {
      return res.status(400).json({
        message: "Le nom doit contenir au moins 2 caractères",
      });
    }

    // 4. Vérifier la force du mot de passe
    if (password.length < 8) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
    }

    // 5. Vérifier confirmation mot de passe
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Les mots de passe ne correspondent pas",
      });
    }

    // 6. Revérifier que l'email n'existe pas
    const existingUser = await db.query(
      "SELECT email FROM Users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Cet email existe déjà",
      });
    }

    // 7. Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8. Créer le user
    const result = await db.query(
      `
      INSERT INTO Users (name, surname, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, name, surname, email
      `,
      [name, surname, email, hashedPassword]
    );

    return res.status(201).json({
      message: "Compte créé avec succès",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
});



export default router;
