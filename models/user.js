import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: { 
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    selectedFile: String,
    banner: {
        type: String,
    },
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
