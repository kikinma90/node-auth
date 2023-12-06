import mongoose, {Schema} from 'mongoose';

// Esta es la definicion del schema, no es el modelo
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    img: {
        type: String,
    },

    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
    }

});

// Esta es la definicion del modelo, que permite interactuar con el schema
export const UserModel = mongoose.model('User', userSchema);