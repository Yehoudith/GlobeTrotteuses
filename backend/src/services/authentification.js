import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export async function compareHash(motDePasse, hash) {
    // Comparer le mot de passe avec le hash stocké
        const ok = await bcrypt.compare(motDePasse, hash);
        if (!ok) throw { status: 401, message: 'Mot de passe invalide'};
        return ok;
    }
export async function createToken(user_id) {
    // Créer le JWT, sans données sensibles
    const token = jwt.sign(
        { userId : user_id },
        process.env.JWT_SECRET,
        { expiresIn: '1h'}
    );
    return token
}