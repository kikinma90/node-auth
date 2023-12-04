
// La version de node 18 no lee las variables del entorno de forma directa, por lo que utiliamos un paquete de terceros 
// y lo adaptamos a nuestras necesidades
// El paquete que utilizamos es dotenv y env-var

// Aqui lo que hacemos es un patron adaptador para adaptar el paquete dotenv a nuestras necesidades
// No utilizamos directamente dotenv o env-var si no que utilizamos nuestro archivo

import 'dotenv/config';
import {get} from 'env-var';

export const envs = {

    PORT: get('PORT').required().asPortNumber(),

}