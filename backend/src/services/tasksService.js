import { createTask } from '../models/tasksModel.js'

export const addTask = async (title, status, category, travel_id, user_id) => {
    if (! title || title.trim() ==='') {
        throw new Error ('title est requis')
    }
    return await createTask(title, status, category, travel_id, user_id)
}