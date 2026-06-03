import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/userRouter.js';

/** router */

const app = express();

//secure headers
app.use(helmet());

//parse JSON from req.body
app.use(express.json())

// parse cookie into req.cookie
app.use(cookieParser());

app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_ORIGIN
}),
);

const PORT=process.env.PORT || 5001



// sanity check
app.get('/health', (_req, res)=>{
    res.json({status: 'OK'});
});

app.use('/api/user', router);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});