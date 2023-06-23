import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import { randomBytes } from 'crypto';

export const generateSecretKey = () => {
  const secretLength = 32; // Longueur de la clé secrète en caractères (vous pouvez ajuster la longueur selon vos besoins)
  return randomBytes(secretLength);
};

config();

export const generateAccessToken = (userId: number): string => {
  const secret = process.env.SECRET_KEY; // clé secrète pour la signature du token
  const expiresIn = '1h'; // Durée de validité du token (1 heure dans cet exemple)

  const payload = { userId };
  return sign(payload, secret, { expiresIn });
};
