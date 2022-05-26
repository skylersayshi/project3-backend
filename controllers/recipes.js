import express from "express";
import mongoose from "mongoose";
const router = express.Router();

export const getRecipe = async (req, res) =>{
    try{
        const Recipe = await Recipe.find();
        console.log(Recipe);

        res.status(200).json(Recipe);
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
