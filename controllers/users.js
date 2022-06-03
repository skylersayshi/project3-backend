import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import mongoose from "mongoose";

export const signin = async(req,res)=>{
    const { email, password } = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) {return res.status(404).json({message: "User not found."})}

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});
    }
    catch(error){
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const signup = async(req,res)=>{
    const {email, password, confirmPassword, firstName, lastName, selectedFile} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists."})

        if(password !== confirmPassword) return res.status(400).json({message: "Passwords do not match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, selectedFile});

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result, token});
    }
    catch(error){
        res.status(500).json({message: 'Something went wrong'});
        console.log(error);
    }
}

export const getprofiles = async (req, res) =>{
    try{
        const profiles = await User.find();

        res.status(200).json(profiles);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const updateprofile = async (req, res) =>{
    const { id } = req.params;

    const { name, bio, myCalories, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { name, bio, selectedFile, myCalories, _id: id};

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
}