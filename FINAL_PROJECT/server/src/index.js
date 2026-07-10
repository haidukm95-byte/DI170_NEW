import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import managerRoutes from './routes/manager.js';
import receiverWorkerRoutes from './routes/receiverWorker.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use((req, res, next) => {
    // express.json() leaves req.body undefined when Content-Type isn't
    // application/json, which crashes any controller destructuring it.
    if (req.body === undefined) req.body = {};
    next();
});
app.use(cookieParser());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/operations', receiverWorkerRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).json({ error: err.message ?? 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
