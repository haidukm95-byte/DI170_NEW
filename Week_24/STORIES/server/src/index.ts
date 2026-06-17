import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import storiesRouter from './routes/stories.js';
import adminRouter from './routes/admin.js';
import contributorsRouter from './routes/contributors.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(o => o.trim())
    : ['http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        // allow same-origin requests (no Origin header) and listed origins
        if (!origin || allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error(`CORS: ${origin} not allowed`));
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/stories', storiesRouter);
app.use('/admin', adminRouter);
app.use('/contributors', contributorsRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.get('/{*path}', (_req, res) => {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
}

// Global error handler — logs the real error and returns JSON instead of an HTML 500 page
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[ERROR]', err.message);
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

