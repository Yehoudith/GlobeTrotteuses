import express from 'express'
import { getAllAccommodations, createAccommodationController } from '../controllers/accommodation.js'
import { requireAuth } from '../controllers/authentification.js'

const accommodationRouter = express.Router()

accommodationRouter.get('/', requireAuth, getAllAccommodations)
accommodationRouter.post('/', requireAuth, createAccommodationController)

export default accommodationRouter