import { addTask } from '../services/tasksService.js'

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