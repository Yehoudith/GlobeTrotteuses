import express from 'express'
import { Pool } from 'pg'
import { db } from '../../db.js';
import { checkTravel } from '../controllers/travel.js';
import { createTravel } from '../controllers/travel.js';

const travelRouter = express.Router()

travelRouter.get('/check-travel', checkTravel)

travelRouter.post('/create-travel', createTravel)


export default travelRouter