import express from 'express';
import { getCalories } from '../controllers/calories.js';

const Router = express.Router();

Router.get('/', getCalories);

export default Router;