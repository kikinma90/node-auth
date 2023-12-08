
import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";


// Es abstracto porque no quiero crear instancias de esta clase
// Sirve para definir reglas
// La idea del repositorio es que conozca los metodos los cuales nosotros vamos a llamar en nuestro datasources
export abstract class AuthRepository {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}