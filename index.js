import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Recipe from './models/recipe.js'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipe.js';
import profileRoutes from './routes/profile.js';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.get('/favicon.ico', (req,res)=>{
  res.send('hello');
});


app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/profile', profileRoutes)




const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

export default mongoose
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
