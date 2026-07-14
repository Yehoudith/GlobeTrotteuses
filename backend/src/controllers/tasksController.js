import { addTask } from '../services/tasksService.js'

// Reçoit la demande de création de tâche, vérifie les champs obligatoires,
// puis délègue la logique métier au service
export const createTask = async (req, res) => {
    const { title, status, category, travel_id, user_id } = req.body

    // On vérifie les champs indispensables avant d'aller plus loin
    if (!title || !travel_id) {
        return res.status(400).json({ error: 'title et travel_id sont requis' })
    }

    try {
        const task = await addTask(title, status, category, travel_id, user_id)
        // 201 = ressource créée avec succès
        res.status(201).json(task)
    } catch (error) {
        console.error(error) // pour voir le détail de l'erreur dans les logs
        res.status(500).json({ error: 'Erreur serveur' })
    }
}