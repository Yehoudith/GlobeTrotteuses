import { getTasksByTravel, createTaskForTravel } from '../services/task.js'

export const getAllTasks = async (req, res) => {
    const { travel_id } = req.query
    const userId = req.user.userId

    if (!travel_id) {
        return res.status(400).json({ error: 'travel_id est requis' })
    }

    try {
        const tasks = await getTasksByTravel(Number(travel_id), userId)
        res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

export const createTaskController = async (req, res) => {
    const { travel_id, title, category } = req.body || {}
    const userId = req.user.userId

    if (!travel_id) {
        return res.status(400).json({ error: 'travel_id est requis' })
    }

    try {
        const task = await createTaskForTravel(Number(travel_id), userId, title, category)
        res.status(201).json(task)
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).json({ error: error.message || 'Erreur serveur' })
    }
}