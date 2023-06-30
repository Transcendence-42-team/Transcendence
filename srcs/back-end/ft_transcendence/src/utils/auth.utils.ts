import { sign } from 'jsonwebtoken';


export const generateAccessToken = (userId: number): string => {
  const secret = process.env.CLIENT_SECRET_BACKEND; // clé secrète pour la signature du token
  const expiresIn = '1h'; // Durée de validité du token (1 heure dans cet exemple)

  const payload = { userId };
  return sign(payload, secret, { expiresIn });
};
