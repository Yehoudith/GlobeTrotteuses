import express from 'express'
import { getAllTasks } from '../controllers/tasksController.js'

const router = express.Router()

router.get('/', getAllTasks)

export default router