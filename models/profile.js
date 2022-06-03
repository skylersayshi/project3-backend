import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
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

const Profile = mongoose.model("Profile", profileSchema);

export default Profile
