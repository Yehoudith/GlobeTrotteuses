import { db } from '../../db.js'

export const findByTravelId = async (travel_id, user_id) => {
    const result = await db.query(
        `SELECT a.accommodation_id, a.name, a.address, a.check_in_date, a.check_out_date
         FROM Accommodations a
         JOIN participate p ON p.travel_id = a.travel_id
         WHERE a.travel_id = $1 AND p.user_id = $2`,
        [travel_id, user_id]
    )
    return result.rows
}

export const createAccommodation = async (travel_id, user_id, name, address, check_in_date, check_out_date) => {
    // Vérifie l'appartenance avant insertion
    const participates = await db.query(
        `SELECT 1 FROM participate WHERE travel_id = $1 AND user_id = $2`,
        [travel_id, user_id]
    )
    if (participates.rows.length === 0) {
        const error = new Error("Vous ne participez pas à ce voyage")
        error.status = 403
        throw error
    }

    const result = await db.query(
        `INSERT INTO Accommodations (name, address, check_in_date, check_out_date, travel_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING accommodation_id, name, address, check_in_date, check_out_date`,
        [name, address, check_in_date, check_out_date, travel_id]
    )
    return result.rows[0]
}