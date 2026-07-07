import express from 'express'
import { getAllTask } from '../controllers/tasksControllers.js'

const router = express.Router()

Router.get('/', getAllTasks)

export default router