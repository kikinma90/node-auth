import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";


export class AuthMiddleware {

    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

        // Lo que hacemos es verificar que se manda el bearer token, y este token le guardamos en el body
        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ error: 'No token provider' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) || '';

        try {

            // El JwtAdapter siempre devuelve algo, o null o el valor
            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if (!payload) return res.status(401).json({ error: 'Invalid Token' });

            // Esto no habria que hacerlo aqui, porque el middleware no debe de verse afectado por cambios en la base de datos
            const user = await UserModel.findById(payload.id);
            // Deberia ser un error 500, y nunca se deberia devolver el error del servidor, deberia ser algo generico
            if (!user) return res.status(401).json({ error: 'Invalid Token - user not found' });

            // Aqui podrias poner si token no valid es necesario generar el token, o usuario no activo, etc
            
            req.body.user = user;
            
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

}