import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express();
const PORT=3000;

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, ()=>console.log(`Running on http://localhost:${PORT}`));