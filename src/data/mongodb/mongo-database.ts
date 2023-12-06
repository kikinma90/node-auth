import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}


export class MongoDatabase {

    // Si vamos a aplicar DI entonces creamos un constructor si no, lo hacemos con un metodo static
    static async connect(options: Options) {

        const {dbName, mongoUrl} = options;

        // Aqui va la conexion a la base de datos
        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            console.log('Mongo connected');
            return true;

        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}