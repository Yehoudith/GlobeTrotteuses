import { db } from '../db.js'

// Récupère toutes les tâches liées à un voyage précis en base de données
export const findByTravelId = async (travel_id) => {
    const result = await db.query(
        'SELECT task_id, title, status, category FROM tasks WHERE travel_id = $1',
        [travel_id]
    )
    return result.rows
}