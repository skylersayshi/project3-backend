import express from "express";
import mongoose from "mongoose";
const router = express.Router();

export const getCalories = async (req, res) =>{
    try{
        const calories = await ('https://api.calorieninjas.com/v1/nutrition?query=')
        // ('https://nutritionix-api.p.rapidapi.com/v1_1/item')
        console.log(calories);

        res.status(200).json(calories);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}