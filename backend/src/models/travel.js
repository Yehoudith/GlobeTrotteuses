import { db } from '../../db.js';

export const findTravel = (titre) => {
    return db.query(`SELECT title FROM travels WHERE title = $1`, [titre])
} 

export const findTravelsByUser = (userId) => {
    return db.query(
        `SELECT t.*
         FROM travels t
         JOIN participate p ON p.travel_id = t.travel_id
         WHERE p.user_id = $1`,
        [userId]
    );
};

export const addParticipant = (userId, travelId) => {
    return db.query(
        `INSERT INTO participate (user_id, travel_id) VALUES ($1, $2)`,
        [userId, travelId]
    );
};

export const createNameTravel = async (titre, starting_date, ending_date, userId) => {
    const client = await db.connect(); // adapte selon ta config db (pool.connect())
    try {
        await client.query('BEGIN');

        const travelResult = await client.query(
            `INSERT INTO travels (title, starting_date, ending_date) VALUES ($1, $2, $3) RETURNING *`,
            [titre, starting_date, ending_date]
        );
        const travel = travelResult.rows[0];

        await client.query(
            `INSERT INTO participate (user_id, travel_id) VALUES ($1, $2)`,
            [userId, travel.travel_id]
        );

        await client.query('COMMIT');
        return [travel];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
