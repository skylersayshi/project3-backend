import express from 'express';
import { getRecipe, createRecipe } from '../controllers/recipes.js';


const router = express.Router();

router.get('/:id', getRecipe);
router.post('/', createRecipe);
// router.patch('/:id', updatePost);
// router.delete('/:id', deletePost);



export default router;