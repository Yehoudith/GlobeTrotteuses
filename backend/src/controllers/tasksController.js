import { getTasksByTravel } from '../services/tasksService.js'

// Reçoit la demande de liste des tâches, vérifie que travel_id est fourni,
// puis délègue la logique métier au service
export const getAllTasks = async (req, res) => {
    const { travel_id } = req.query
    
    if (!travel_id) {
        return res.status(400).json({ error: 'travel_id est requis'})
    }

    try {
        const tasks = await getTasksByTravel(Number(travel_id))
        res.status(200).json(tasks)
    } catch (error) {
        console.error(error) // pour voir le détail de l'erreur dans les logs
        res.status(500).json({ error: 'Erreur serveur'})
    }
}