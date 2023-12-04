
import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";


// Es abstracto porque no quiero crear instancias de esta clase
// Sirve para definir reglas
// La idea del repositorio es que conozca los metodos los cuales nosotros vamos a llamar en nuestro datasources
export abstract class AuthRepository {

    // todo:
    // abastract login(loginregisterUserDto: LoginUserDto): Promise<UserEntity>

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}