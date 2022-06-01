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
    selectedFile: String,
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

export default mongoose.model("User", userSchema);
