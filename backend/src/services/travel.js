import { findTravel } from '../models/travel.js';

export const checkNameTravel = async (title) => {
    const result = await findTravel(title)
    if (result.rows.length > 0){
        return false
    } else {
        return true
    }  
}