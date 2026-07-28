import bcrypt from "bcrypt";
import {
  findUserByMail,
  insertUser,
} from "../models/users.js";

export async function checkEmailExist(email) {
  const user = await findUserByMail(email);

  return Boolean(user);
}

export async function registrerUser(userData) {
  const {
    name,
    surname,
    email,
    password,
    confirmPassword,
  } = userData;

  if (!name || !surname || !email || !password || !confirmPassword) {
    const error = new Error("Tous les champs sont obligatoires");
    error.status = 400;
    throw error;
  }

  if (name.length < 2) {
    const error = new Error(
      "Le prénom doit contenir au moins 2 caractères"
    );
    error.status = 400;
    throw error;
  }

  if (surname.length < 2) {
    const error = new Error(
      "Le nom doit contenir au moins 2 caractères"
    );
    error.status = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error(
      "Le mot de passe doit contenir au moins 8 caractères"
    );
    error.status = 400;
    throw error;
  }

  if (password !== confirmPassword) {
    const error = new Error(
      "Les mots de passe ne correspondent pas"
    );
    error.status = 400;
    throw error;
  }

  const existingUser = await findUserByMail(email);

  if (existingUser) {
    const error = new Error("Cet email existe déjà");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await insertUser(
    name,
    surname,
    email,
    hashedPassword
  );

  return newUser;
}