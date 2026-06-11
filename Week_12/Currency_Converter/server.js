import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5128;

app.use(express.static(path.join(__dirname, 'res')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'res', 'index.html'));
});

app.listen(PORT, () => { console.log(`Running on http://localhost:${PORT}`); });
