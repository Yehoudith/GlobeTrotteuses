import { getTasksByTravel, addTask } from '../services/tasksService.js'

export const getAllTasks = async (req, res) => {
    const { travel_id } = req.query
    
    if (!travel_id) {
        return res.status(400).json({ error: 'travel_id est requis'})
    }

    try {
        const tasks = await getTasksByTravel(Number(travel_id))
        res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur serveur'})
    }
}

export const createTask = async (req, res) => {
    const { title, status, category, travel_id, user_id } = req.body

    if (!title || !travel_id) {
        return res.status(400).json({ error: 'title et travel_id sont requis' })
    }

    try {
        const task = await addTask(title, status, category, travel_id, user_id)
        res.status(201).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}