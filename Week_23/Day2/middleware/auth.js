import jwt from 'jsonwebtoken';

export function authenticate(req,res,next){
    const token=req.cookies.access_token;

if(!token){
    return res.status(401).json({message: "Unauthorized"});
    }
    try{
        const payload=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user=payload;
        next();
    } catch(error){
        return res.status(401).json({message: "Unauthorized"})
    }
};