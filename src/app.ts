import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

// Esto es una funcion anonima autoinvocada, es decir, se ejecuta sola, y puede ser asincrona
(() => {
    main();
})();


async function main (){
    // todo: await base de datos
    
    // todo: inicio de nuestro server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
        .start()

}