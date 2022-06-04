import PostMessage from "../models/postMessage.js";
import express from "express";
import mongoose from "mongoose";
const router = express.Router();

export const getPosts = async (req, res) =>{
    try{
        const postMessages = await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch = async (req,res) =>{
    const {searchQuery, tags} = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [ { title }, { tags } ]});
        // ({ $or: [{title}, {tags: { $in: tags.split(',') }}] });

        res.json({data: posts});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) =>{
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) =>{
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags, profilePic } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id, profilePic };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) =>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'This post has been successfully deleted'})
}

export const likePost = async (req,res) =>{
    const {id} = req.params;
    if(!req.userId){ return res.json({message: 'Not authenticated'})};
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    } else{
        post.likes = post.likes.filter((id)=> id !== String(req.userId));
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
    res.json(updatePost);
}

export default router;