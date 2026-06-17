import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request{
    user?: {user_id: number; email: string};
}

export function verifyJWT(req: AuthRequest, res: Response, next: NextFunction){
    const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token)return res.status(401).json({error: 'No token'});
    try{
        req.user=jwt.verify(token, process.env.JWT_SECRET!) as any;
        next();
    } catch {res.status(403).json({error: "Invalid token"})};

}