import { db } from '../../db.js';
import { findTravel } from '../models/travel.js';
import { checkNameTravel } from '../services/travel.js';

export const checkTravel = async (req,res) => {
    const { title } = req.body || {}
    if (!title) {
     return res.status(400).json({ error : 'Titre manquant'})
    }
    const response = await checkNameTravel(title)
    if (!response){
        return res.status(400).json({error : 'Ce nom de voyage est déjà pris'})
    } else {
        res.send('ok')
    }   
}

export const createTravel = async (req, res) => {
    const result = await checkTravel(req,res)
    console.log(result)
    // if (result.res == 400) 
    //     // à vérifier
    // const { title } = req.body || {}
    // createNameTravel
}