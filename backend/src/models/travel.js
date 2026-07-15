import { db } from '../../db.js';

export const findTravel = (titre) => {
    return db.query(`SELECT title FROM travels WHERE title = '${titre}'`)
} 

// export const createNameTravel = (titre) => {
//     return db.query(`INSERT INTO travels (title, starting_date, ending_date) VALUES 1$, 2$, 3$`, [titre])
// }