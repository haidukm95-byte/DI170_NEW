import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';

// POST / api/user/register
export async function registerUser(req,res){
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400).json({message: 'email and password are required'});
        return;
    }
    try{
        const user=await userModel.createUser(email, password)
        res.status(201).json({message: 'User registered', user })
    } catch (error){
        console.error(error);
        if(error.code==='23505'){
            res.status(409).json({message: 'Email already exists'})
            return;
        }
        res.status(500).json({message: 'internal server error'})
    }
}

// POST api/user/login
export async function loginUser(req,res){
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400).json({message: 'email and password are required'});
        return;
    }
    try{
        const user=await userModel.getUserByEmail(email);
        if(!user) {
            res.status(404).json({message: "User not found"});
            return;
        }
        const ok=await userModel.verifyPassword(password, user.password);
        if (!ok) {
            res.status(401).json({message: "Wrong password"});
            return;
        }
        // sign JWT token
        const SECRET = process.env.ACCESS_TOKEN_SECRET;
        const token=jwt.sign(
            {userId: user.id, email: user.email},
            SECRET,
            {expiresIn:'60s', algorithm: 'HS256'}
        )
        // set token in the cookie session
        res.cookie('access_token', token, {
            httpOnly: true, // not readable by JS XSS safe
            //secure: only for https connection
            //path: '/'
            maxAge: 60*1000 //only milisecond format here!! ususally same time as in secret.expiresIn
        }) // you can select any token name

        res.status(200).json({user: {id: user.id, email: user.email}, token})
    } catch (error){
        console.error(error);
        res.status(500).json({message: 'internal server error'})
    }
}
