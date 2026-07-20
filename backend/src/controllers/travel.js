import { db } from '../../db.js';
import { createNameTravel, findTravel } from '../models/travel.js';
import { checkNameTravel } from '../services/travel.js';

export const checkTravel = async (req,res) => {
    const { title } = req.body || {}
    if (!title) {
     return {valid: false,  error : 'Titre manquant'}
    }
    const response = await checkNameTravel(title)
    if (!response){
        return {valid: false, error : 'Ce nom de voyage est déjà pris'}
    }
    return {valid: true}
}

export const createTravel = async (req, res) => {
    try {
        const { title, starting_date, ending_date } = req.body || {}
        const check = await checkTravel(req,res)
        if (!check.valid) {
            return res.status(400).json({error : check.error})
        } 
        const response = await createNameTravel(title, starting_date, ending_date)
        return res.status(201).json(response[0])
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur serveur'})
    }
}