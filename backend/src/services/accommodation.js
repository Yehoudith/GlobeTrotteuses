import { findByTravelId, createAccommodation } from '../models/accommodation.js'

export const getAccommodationsByTravel = async (travel_id, user_id) => {
    if (!travel_id) {
        const error = new Error("travel_id invalide")
        error.status = 400
        throw error
    }
    return await findByTravelId(travel_id, user_id)
}

export const createAccommodationForTravel = async (travel_id, user_id, name, address, check_in_date, check_out_date) => {
    if (!name || !address || !check_in_date || !check_out_date) {
        const error = new Error("Tous les champs sont obligatoires")
        error.status = 400
        throw error
    }
    if (new Date(check_out_date) <= new Date(check_in_date)) {
        const error = new Error("La date de départ doit être après la date d'arrivée")
        error.status = 400
        throw error
    }
    return await createAccommodation(travel_id, user_id, name, address, check_in_date, check_out_date)
}