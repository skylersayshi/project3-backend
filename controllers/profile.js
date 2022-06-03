import Profile from '../models/profile.js';
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

export const getProfile = async (req, res) =>{
    try{
        const userData = await Profile.find();
        console.log(userData);

        res.status(200).json(userData);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createProfile = async (req, res) =>{
    const profile = req.body;
    const newUserInfo = new Profile({...profile, firstName: firstName, lastName: req.lastName, bio: req.bio, banner: req.banner, selectedFile: req.selectedFile, profilePic: req.profilePic, });

    try{
        await newUserInfo.save();
        res.status(201).json(newUserInfo);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updateProfile = async (req, res) =>{
    const { id } = req.params;
    const { firstName, lastName, banner, selectedFile, bio, profilePic, _id } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedProfile = { firstName, lastName, banner, selectedFile, bio, profilePic, _id: id};

    await Profile.findByIdAndUpdate(id, updatedProfile, { new: true });

    res.json(updatedProfile);
}

export default router;