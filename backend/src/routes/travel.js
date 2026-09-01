import express from 'express'
import { checkTravel, getUserTravels } from '../controllers/travel.js';
import { createTravel } from '../controllers/travel.js';
import { requireAuth } from '../controllers/authentification.js';

const travelRouter = express.Router()

travelRouter.get('/check-travel', requireAuth, checkTravel)

travelRouter.post('/create-travel', requireAuth, createTravel)

travelRouter.get('/', requireAuth, getUserTravels)

export default travelRouter