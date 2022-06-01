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
        type: String,
    },
    bio: {
        type: String,
    },
    selectedFileProfile: String,
    selectedFileBanner: String,
    favRecipes: [{
        name: String,
        ingredients: String,
        instructions: String,
        img: String,
    }
    ],
    myCalories: Number,

});

const User = mongoose.model("User", userSchema);

export default User
