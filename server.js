// DEPENDENCIES

// get access to .env variables
require('dotenv').config();

// pull PORT from .env, set default value to 3000
const { PORT = 4321, MONGODB_URL } = process.env;

// import express
const express = require('express');

// create application object
const app = express();

// import mongoose
const mongoose = require('mongoose');

// import middleware
const cors = require('cors');
const morgan = require('morgan');

// CONNECTING TO DATABASE
mongoose.connect(MONGODB_URL);

// connecting events
mongoose.connection
.on('open', () => console.log('you are connected!'))
.on('close', () => console.log('you are disconnected!'))
.on('error', (error) => console.log(error))

// MODELS
const UserSchema = new mongoose.Schema({
        name: String,
            // required: true
       
        username: String,
            // required: true
        imageURL: String
            // required: true
        
    })

const User = mongoose.model('User', UserSchema);
// const corsOptions = ...list of sites that are ok
// MIDDLEWARE
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan('dev')) // logging http responses
app.use(express.json()) // parsing json objects

//seed data
// const seedData = require('./seed.json');

// User.deleteMany({})
//     .then(()=>{
//         console.log('this hit')
//         return User.insertMany(seedData);
//     }).finally(()=> process.exit());

// ROUTES

// create a test router
app.get('/', (req, res) => {
    res.send('hello world!');
});

// get people route
app.get('/people', async (req, res) => {
    try {
        // console.log(req.query);
        let peopleFound
        if(req.query.q) {
            peopleFound = await User.find({name: req.query.q})
            console.log(peopleFound)
        } else {
            peopleFound = await User.find({})
            console.log(peopleFound)
        }
        res.json(peopleFound);
    } catch (error) {
        res.status(400).json(error);
    }
})

// create people route
app.post('/people', async (req, res) => {
    try {
        console.log(`req.body is ${req.body}`)
        let createdPerson = await User.create(req.body)
        console.log(`created person is ${createdPerson}`)
        res.json(createdPerson)
    } catch (error) {
        res.status(400).json(error);
    }
})

// update people route
app.put('/people/:id', async (req, res) => {
    try {
        let updatedPerson = await User.findByIdAndUpdate(req.params.id, req.body)
        console.log(updatedPerson)
        res.json(updatedPerson)
    } catch (error) {
        res.status(400).json(error);
    }
})

// delete people route
app.delete('/people/:id', async (req, res) => {
    try {
        let deletedPerson = await User.findByIdAndRemove(req.params.id)
        console.log(deletedPerson)
        res.json(deletedPerson)
    } catch (error) {
        res.status(400).json(error);
    }
})

// LISTENER

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));