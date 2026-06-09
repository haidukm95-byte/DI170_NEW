import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/router.js';

const app=express();

app.use(helmet());
app.use(express.json()); //instead of BodyParser while using earlier versions of Express
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_ORIGIN,
    })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`Running on http://localhost:${PORT}`)});

//app sanity check
app.get('/health', (_req, res)=>{
    res.json({status: "OK"});
});

app.use('/api/user', router);


