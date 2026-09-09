import { findByTravelId, createTask } from '../models/task.js'

export const getTasksByTravel = async (travel_id, user_id) => {
    if (travel_id < 0) {
        throw new Error('travel_id invalide')
    }
    return await findByTravelId(travel_id, user_id)
}

export const createTaskForTravel = async (travel_id, user_id, title, category) => {
    if (!title) {
        const error = new Error('Le titre de la tâche est requis')
        error.status = 400
        throw error
    }
    return await createTask(travel_id, user_id, title, category)
}