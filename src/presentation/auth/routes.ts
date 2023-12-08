import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class AuthRoutes {

    // Si haces DI con un constructor entonces no se hace metodos static.

    static get routes(): Router {
        
        const router = Router();

        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        // Definir todas mis rutas principales
        // mandamos la funcion del controllador como referencia, puesto que los parametros de entrada
        // son los mismos que mandamos a la funcion del controlador
        router.post('/login', controller.loginUser)

        router.post('/register', controller.registerUser)

        // El middleware o middlewares se ponen en el segundo parametro y se ejecuta antes que el controller
        router.get('/', [AuthMiddleware.validateJWT], controller.getUsers)

        return router;
    }


}