import {
  checkEmailExist,
  registrerUser,
} from "../services/users.js";

export async function CheckEmail(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "L'email est obligatoire",
      });
    }

    const exists = await checkEmailExist(email);

    return res.json({
      exists,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
}

export async function CreateUsers(req, res) {
  try {
    const newUser = await registrerUser(req.body);

    return res.status(201).json({
      message: "Compte créé avec succès",
      user: newUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
}
