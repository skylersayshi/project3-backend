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