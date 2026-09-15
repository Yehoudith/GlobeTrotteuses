import express from 'express'
import { getAllTasks, createTaskController } from '../controllers/task.js'
import { requireAuth } from '../controllers/authentification.js'

const tasksRouter = express.Router()

tasksRouter.get('/', requireAuth, getAllTasks)
tasksRouter.post('/', requireAuth, createTaskController)

export default tasksRouter