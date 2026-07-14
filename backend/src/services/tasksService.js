import { findByTravelId, createTask } from '../models/tasksModel.js'
export const getTasksByTravel = async (travel_id) => {
    if (travel_id < 0) {
        throw new Error('travel_id invalide')
    }
    return await findByTravelId(travel_id)
}

export const addTask = async (title, status, category, travel_id, user_id) => {
    if (! title || title.trim() ==='') {
        throw new Error ('title est requis')
    }
    return await createTask(title, status, category, travel_id, user_id)
}