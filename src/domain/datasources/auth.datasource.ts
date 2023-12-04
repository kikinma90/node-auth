

import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";


// Es abstracto porque no quiero crear instancias de esta clase
// Sirve para definir reglas
export abstract class AuthDatasource {

    // todo:
    // abastract login(loginregisterUserDto: LoginUserDto): Promise<UserEntity>

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}