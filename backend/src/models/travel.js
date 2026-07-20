import { db } from '../../db.js';

export const findTravel = (titre) => {
    return db.query(`SELECT title FROM travels WHERE title = $1`, [titre])
} 

export const createNameTravel = async (titre, starting_date, ending_date) => {
    const result = await db.query(`INSERT INTO travels (title, starting_date, ending_date) VALUES ($1, $2, $3) RETURNING *`, [titre, starting_date, ending_date])
    return result.rows
}