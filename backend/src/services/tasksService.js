import { findByTravelId } from '../models/tasksModel.js'
export const getTasksByTravel = async (travel_id) => {
    if (travel_id < 0) {
        throw new Error('travel_id invalide')
    }
    return await findByTravelId(travel_id)
}