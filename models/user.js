import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    DOB: Number,
    likes: String,
    profileImage: {
        type: String
    },
    email: String,
    aboutMe: String,
    following: Array,
    followers: Array
});

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    }
});

export default mongoose.model("User", userSchema);
