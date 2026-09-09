import { getAccommodationsByTravel, createAccommodationForTravel } from '../services/accommodation.js'

export const getAllAccommodations = async (req, res) => {
    const { travel_id } = req.query
    const userId = req.user.userId

    try {
        const accommodations = await getAccommodationsByTravel(Number(travel_id), userId)
        return res.status(200).json(accommodations)
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).json({ error: error.message || "Erreur serveur" })
    }
}

export const createAccommodationController = async (req, res) => {
    const { travel_id, name, address, check_in_date, check_out_date } = req.body || {}
    const userId = req.user.userId

    try {
        const accommodation = await createAccommodationForTravel(
            Number(travel_id), userId, name, address, check_in_date, check_out_date
        )
        return res.status(201).json(accommodation)
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).json({ error: error.message || "Erreur serveur" })
    }
}