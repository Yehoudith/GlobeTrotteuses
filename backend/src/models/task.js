import { db } from '../../db.js'

export const findByTravelId = async (travel_id, user_id) => {
    const result = await db.query(
        `SELECT t.task_id, t.title, t.status, t.category
         FROM tasks t
         JOIN participate p ON p.travel_id = t.travel_id
         WHERE t.travel_id = $1 AND p.user_id = $2`,
        [travel_id, user_id]
    )
    return result.rows
}

export const createTask = async (travel_id, user_id, title, category) => {
    const result = await db.query(
        `INSERT INTO tasks (travel_id, user_id, title, status, category)
         VALUES ($1, $2, $3, 'to do', $4)
         RETURNING task_id, title, status, category`,
        [travel_id, user_id, title, category]
    )
    return result.rows[0]
}