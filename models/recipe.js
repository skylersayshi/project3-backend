
import mongoose from 'mongoose'
// const mongoose = require("../index.js") ;


const recipeSchema = mongoose.Schema({
        
        name: String,
        creator: String,
        ingredients: String,
        instructions: String,
        img: String
    
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

