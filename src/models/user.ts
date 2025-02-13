import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['NA','M','F'],
        required: true
    },
    // date_of_birth: {
    //     type: Date,
    //     required: true
    // },
    country: {
        type: String,
        required: true
    }
});

const User = model('User', userSchema);

export default User