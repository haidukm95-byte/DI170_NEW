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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,  // required for cookies to be sent cross-origin
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/stories', storiesRouter);
app.use('/admin', adminRouter);

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

