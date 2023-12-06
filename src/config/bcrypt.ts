
import { compareSync, hashSync } from 'bcryptjs';

// Vamos hacer un patron adaptador para llamar al paquete para que me encripte la contraseña

export class BcryptAdapter {

    static hash (password: string): string {
        return hashSync(password);
    }

    // Para comparar si las contraseñas hacen match
    static compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }

}