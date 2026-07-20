import { findByTravelId } from '../models/tasksModel.js'

// Contient la règle métier : un travel_id valide est nécessaire
export const getTasksByTravel = async (travel_id) => {
    if (travel_id < 0) {
        throw new Error('travel_id invalide')
    }
    return await findByTravelId(travel_id)
}