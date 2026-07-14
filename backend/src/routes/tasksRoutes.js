import express from 'express'
import { createTask } from '../controllers/tasksController.js'

const router = express.Router()
// Route pour créer une nouvelle tâche liée à un voyage
router.post('/', createTask)

export default router