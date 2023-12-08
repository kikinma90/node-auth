import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";


// Interactuamos directamente con el repositorio no con el datasource, nuestro repositorio recibe datasource
// El repositorio se queda igual y yo estoy cambiando el datasource
export class AuthRepositoryImpl implements AuthRepository {

    constructor
    (
        private readonly authDatasource: AuthDatasource
    ) {}
    
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);    
    }

}