import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";



export class AuthController {

    //DI patron que nos indica que este authcontroller depende de algo, necesita que le proporcionemos algo
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    // Metodo
    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        
        }
        console.log(error); // Se haria esta parte con winston
        return res.status(500).json({error: 'Internal server error'});
    }

    // Los controlladores van acacar llamando a casos de uso, como registrar un usario, logear un usuario, etc

    // No recomiendan que sea asincrono
    registerUser = (req: Request, res: Response) => {

        // DTO
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({error});

        this.authRepository.register(registerUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    // No recomiendan que sea asincrono
    loginUser = (req: Request, res: Response) => {
        res.json('loginUser controller')
    }

}