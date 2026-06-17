import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {pool} from '../db/pool.js';
import { verifyJWT, type AuthRequest } from '../middleware/verifyJWT.js';

const router=express.Router();

//REGISTER
router.post('/register', async(req,res)=>{
    const {username,email,password}=req.body;
    const hashed=await bcrypt.hash(password,12);
    const result=await pool.query(`
        INSERT INTO users(username, email, password)
        VALUES ($1, $2, $3) RETURNING user_id, username, email`,
        [username, email, hashed]
    );
    const user=result.rows[0];
    const token=jwt.sign({user_id: user.user_id, email: user.email},
        process.env.JWT_SECRET!, {expiresIn: '5m'});
    res.cookie('token', token, {httpOnly: true, sameSite: 'strict'});
    res.json({user, token});
});

//LOGIN
router.post('/login', async (req, res) => {
    const { identifier, password, stayLoggedIn } = req.body;
    const result = await pool.query(
        'SELECT * FROM users WHERE email=$1 OR username=$1',
        [identifier]
    );
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ error: 'Invalid credentials' });

    const expiresIn = stayLoggedIn ? '48h' : '5m';
    const token = jwt.sign({ user_id: user.user_id, email: user.email },
        process.env.JWT_SECRET!, { expiresIn });
    res.cookie('token', token, { httpOnly: true, maxAge: stayLoggedIn ? 172800000 : 300000 });
    res.json({ user: { user_id: user.user_id, username: user.username, avatar: user.avatar, is_admin: user.is_admin ?? false }, token });
});


// CHECK USERNAME / EMAIL AVAILABILITY (for real-time input validation)
router.get('/check', async (req, res) => {
    const { field, value } = req.query;
    if (!['username', 'email'].includes(field as string)) return res.status(400).end();
    const result = await pool.query(`SELECT 1 FROM users WHERE ${field}=$1`, [value]);
    res.json({ available: result.rowCount === 0 });
});

// VERIFY TOKEN — called on app load to check if stored token is still valid
router.get('/verify', verifyJWT, async (req: AuthRequest, res) => {
    const { user_id } = req.user!;
    const result = await pool.query(
        'SELECT user_id, username, avatar, is_admin FROM users WHERE user_id=$1',
        [user_id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { ...result.rows[0], is_admin: result.rows[0].is_admin ?? false } });
});

// LOGOUT
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

export default router;
