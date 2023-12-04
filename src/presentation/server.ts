import express, { Router } from 'express';


interface Options {
    port?: number;
    routes: Router;
}

export class Server {
    // La idea que se tiene del constructor del server es que te puedan mandar las configuraciones y los cambios que tengo que hacer
    // a nuestro servidor, es decir que si se quieren hacer cambios se hagan mediante properties.
    // Clases abiertas a la expansion pero cerradas a la modificacion

    // Vamos a usar express
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;


    constructor(options: Options){
        const { port = 3100, routes } = options;

        this.port = port;
        this.routes = routes;


    }

    async start(){

        // Middlewares (funciones que se ejecutan antes de otras funciones)
        this.app.use(express.json()); // raw json
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded


        // Para poder usar tus rutas definidas en la aplicacion se definen en el middleware
        this.app.use(this.routes);

        // Escuchar el puerto
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }

}