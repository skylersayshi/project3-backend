import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Recipe from '../models/recipe.js'

export const getRecipes = async (req, res) =>{
    try{
        const recipe = await Recipe.find();
        console.log(recipe);

        res.status(200).json(recipe);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getRecipe = async (req, res) =>{
    const { id } = req.params;
    try{
        const recipe = await Recipe.findById(id);
        // console.log(recipe);

        res.status(200).json(recipe);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createRecipe = async (req, res) => {
    
    try {console.log(req.body)
        res.json(await Recipe.create(req.body))}
      
      catch (error) {
        res.status(400).json(error)
      }

}

export const updateRecipe = async (req, res) =>{
    const { id } = req.params;
    // const { name, ingredients, description, img } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No recipe with id: ${id}`);

    const updatedRecipe = { };
    if (req.body.name) {
        updatedRecipe.name = req.body.name;
    }
    if (req.body.ingredients) {
        updatedRecipe.ingredients = req.body.ingredients;
    }
    if (req.body.instructions) {
        updatedRecipe.instructions = req.body.instructions;
    }
    if (req.body.img) {
        updatedRecipe.img = req.body.img;
    }
    // console.log(updatedRecipe);
    // console.log('tom is great')
    // console.log(name, ingredients, description, img);
    await Recipe.findOneAndUpdate(id, updatedRecipe, { new: true })
    .then((updatedRecipe) => {
    return res.json(updatedRecipe)
    });
}

export const deleteRecipe = async (req, res) =>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No recipe with id: ${id}`);

    await Recipe.findByIdAndRemove(id);

    res.json({message: 'This recipe has been successfully deleted'})
}

