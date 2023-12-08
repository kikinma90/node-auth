import { Request, Response } from "express"
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain";
import { UserModel } from "../../data/mongodb";



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

        // Delegamos la logica de negocio al caso de uso
        // Lo hacemos asi hasta la ultima seccion que lo modificaremos con los casos de uso.
        // Un parentesis con llave ({}) significa que lo que hay dentro es un objeto
        // this.authRepository.register(registerUserDto!)
        //     .then(async (user) => {
        //         res.json({
        //             user,
        //             token: await JwtAdapter.generateToken({id: user.id})
        //         });
        //     })
        //     .catch(error => this.handleError(error, res));

        // Ahora que hemos implementado nuestros casos de uso, llamamos a nuestros casos de uso
        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    // No recomiendan que sea asincrono
    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({error});

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
        .then(users => res.json({
            //users,
            user: req.body.user
        }))
        .catch(() => res.status(500).json({error: 'Internal server error'}))
    }

}