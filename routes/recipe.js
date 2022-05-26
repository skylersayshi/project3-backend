import express from 'express';
import { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes.js';


const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);



export default router;