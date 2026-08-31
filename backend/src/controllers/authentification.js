import { findUserByMail } from "../models/users.js";
import jwt from 'jsonwebtoken'
import { compareHash, createToken } from "../services/authentification.js";

// Login : vérifier les identifiants, créer le token
export async function login(email, motDePasse) {
    const user = await findUserByMail(email);
    if (!user) throw { status: 401, message: 'Identifiants invalides'}

    await compareHash(motDePasse, user.password)
    const token = await createToken(user.user_id)

    const { password, ...safeUser } = user; // Retirer le hash
    return { token, user: safeUser }
}

// Middleware : vérifier le token sur les routes protégées
export async function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer '))
        return res.status(401).json({ error: 'Token manquant' });

    try{
        const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ error: 'Token invalide ou expiré'});
    }
}