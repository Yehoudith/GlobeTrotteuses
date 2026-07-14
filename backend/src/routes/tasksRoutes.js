import express from 'express'
import { getAllTasks, createTask } from '../controllers/tasksController.js'

const router = express.Router()

router.get('/', getAllTasks)
router.post('/',createTask)

