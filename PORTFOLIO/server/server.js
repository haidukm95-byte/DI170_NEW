import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { configDotenv } from 'dotenv';

configDotenv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, '..')));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.use(router);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
