import pg from 'pg'
const {Pool} = pg;

if(!process.env.DATABASE_URL){
    throw new Error('DATABASE_URL is missing from .env');
};

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL==='false'? false : {rejectUnauthorized:false},
    
});

/* 
CREATE TABLE IF NOT EXISTS users (
  id          BIGSERIAL PRIMARY KEY,
  email       CITEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,          -- argon2 hash, NEVER the raw password
  created_at  TIMESTAMPTZ DEFAULT now()
);
*/