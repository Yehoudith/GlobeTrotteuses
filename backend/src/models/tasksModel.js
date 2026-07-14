import { db } from '../db.js'

export const findByTravelId = async (travel_id) => {
    const result = await db.query(
        'SELECT task_id, title, status, category FROM tasks WHERE travel_id = $1',
        [travel_id]
    )
    return result.rows
}

export const createTask = async (title, status, category, travel_id, user_id) => {
    const result = await db.query(
        'INSERT INTO tasks (title, status, category, travel_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, status, category, travel_id, user_id]
    )
    return result.rows[0]
}