import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { pool } from './pool.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '../../../Create_tables.sql');

// Create_tables.sql is written to be safely re-run: CREATE TABLE IF NOT EXISTS,
// CREATE OR REPLACE FUNCTION/TRIGGER, and ON CONFLICT DO NOTHING seed inserts.
// Running it as one query executes it as a single implicit transaction, so a
// failure partway through rolls back instead of leaving triggers half-applied.
export async function migrate() {
    const sql = readFileSync(schemaPath, 'utf8');
    await pool.query(sql);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    migrate()
        .then(() => {
            console.log('Database schema applied successfully');
            process.exit(0);
        })
        .catch(err => {
            console.error('Database schema migration failed:', err);
            process.exit(1);
        });
}
