import express from 'express'
import { getAllTasks } from '../controllers/tasksController.js'

const Tasksrouter = express.Router()

// Route pour récupérer la liste des tâches d'un voyage
Tasksrouter.get('/', getAllTasks)

export default Tasksrouter