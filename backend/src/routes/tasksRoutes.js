import express from 'express'
import { getAllTasks } from '../controllers/tasksController.js'

const router = express.Router()

// Route pour récupérer la liste des tâches d'un voyage
router.get('/', getAllTasks)

export default router