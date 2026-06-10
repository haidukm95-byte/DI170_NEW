import jwt from "jsonwebtoken";
import * as userModel from "../models/userModel.js";
import { json } from "stream/consumers";
import path from "path";

export async function registerUser(req,res) {
    const {email,password}=req.body;
    if(!email || !password) {
        res.status(400).json({message: "Wrong credentials"});
        return;
    }
    try{
        const user=await userModel.createUser(email,password);
        res.status(201).json({message: "User registered", user})
    }   catch (error){
        console.error(error);
        if (error.code === "23505") {
            res.status(404).json({ message: "Wrong credentials" });
            return;
        }
        res.status(500).json({message: "Internal server error"});
    }
}

export async function loginUser(req,res) {
    const {email,password}=req.body;
    if(!email || !password) {
        res.status(400).json({message: "Wrong credentials"});
        return;
    }
    try{
    const user=await userModel.getUserByEmail(email);
    if(!user){
        res.status(404).json({message: "Wrong credentials"});
        return;
    }
    const isMatch=await userModel.verifyPassword(password, user.password);
    if(!isMatch){
        res.status(404).json({message: "Wrong credentials"});
        return;
    }

    const SECRET=process.env.ACCESS_TOKEN_SECRET;
    const token=jwt.sign({ userId: user.id, email: user.email }, SECRET, {
          expiresIn: "20m",
          algorithm: "HS256",
        });

    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1200*1000
    })

    res.status(200).json({user: {id: user.id, email: user.email}})
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

export async function showAllUsers(req,res) {
    try {
        const list = await userModel.listUsers();
        res.status(200).json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export function logoutUser(req,res){
    res.clearCookie('access_token',{ httpOnly: true });
    res.status(200).json({message: "Logged out"})
};


