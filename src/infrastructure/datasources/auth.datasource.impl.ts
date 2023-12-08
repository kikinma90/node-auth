import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

// type se usa para un tipo de dato, es lo mismo que te dice VSCODE cuando pones el mouse sobre la funcion
// Esto es la firma
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) {}
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDto;
        
        try {
            
            // 1. Verificar si el correo existe
            const exists = await UserModel.findOne({email});
            if (exists)  throw CustomError.badRequest('User already exists');
            
            //2. Encriptar la contraseña, mediante Hash
            
            const user = await UserModel.create({
                name : name, 
                email: email,
                password: this.hashPassword(password),
            });
            
            await user.save();
            
            
            
            
            //3. Mapear la respuesta a nuestra entidad
            // Al ser una clase que hemos creado nosotros(y se encuentra aqui mismo), lo podemos hacer asi o en el contructor, como quieras.
            return UserMapper.userEntityFromObject(user);
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            
            throw CustomError.internalServer();
        }
        
    }


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email, password } = loginUserDto;
        
        try {
            
            // 1. Verificar si el correo existe
            const user = await UserModel.findOne({email});
            if (!user)  throw CustomError.badRequest('User does not exists - email');

            // Ahora vamos a comprobar que las contraseñas hacen match
            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest('Password is not valid');
            
            return UserMapper.userEntityFromObject(user);
            
        } catch (error) {
            console.log(error);
            
            throw CustomError.internalServer();
        }

    }

}