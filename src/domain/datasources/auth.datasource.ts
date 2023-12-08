

import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";


// Es abstracto porque no quiero crear instancias de esta clase
// Sirve para definir reglas
export abstract class AuthDatasource {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}