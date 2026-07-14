import { db } from '../db.js'

// Insère une nouvelle tâche en base de données et renvoie la ligne créée
export const createTask = async (title, status, category, travel_id, user_id) => {
    const result = await db.query(
        'INSERT INTO tasks (title, status, category, travel_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, status, category, travel_id, user_id]
    )
    return result.rows[0]
}