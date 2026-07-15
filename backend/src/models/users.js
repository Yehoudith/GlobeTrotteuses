import { db } from "../../db.js";

export async function findUserByMail(email) {
  const result = await db.query(
    "SELECT user_id, name, surname, email FROM Users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}

export async function insertUser(name, surname, email, hashedPassword) {
  const result = await db.query(
    `
    INSERT INTO Users (name, surname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, name, surname, email
    `,
    [name, surname, email, hashedPassword]
  );

  return result.rows[0];
}