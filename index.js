import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Recipe from './models/recipe.js'
import postRoutes from './routes/posts.js';
import calorieRoutes from './routes/calories.js';
import recipeRoutes from './routes/recipe.js'

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/calories', calorieRoutes);
app.use('/recipes', recipeRoutes)


const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

export default mongoose