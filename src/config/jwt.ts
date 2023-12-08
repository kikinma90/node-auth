import jwt from 'jsonwebtoken';
import { envs } from './envs';

// Se puede hacer as'i o ponerlo en el constructor, pero en el constructor lo va a requerir tanto para 
// validar el token como para generarlo
const JWT_SEED = envs.JWT_SEED;

// Esto va a ser un adaprter
// El problema que tiene este paquete es que funciona con callbacks y no con promesas
export class JwtAdapter {
    static async generateToken(
        payload: Object, 
        duration: string = '2H'): Promise<string|null> {

        return new Promise((resolve) => {

            // todo: generacion del seed
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {

                if (err) return resolve(null);
                 // Como si no hay error hemos recibido el token, lo devolvemos
                resolve(token!);

            });

        });

    }

    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise ((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);

                resolve(decoded as T);

            });
        }); 
    }

}