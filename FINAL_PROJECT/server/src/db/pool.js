import { Pool, types } from "pg";
import dotenv from 'dotenv';

dotenv.config();

// DATE (oid 1082): pg's default parser builds a local-midnight JS Date,
// which JSON.stringify then renders in UTC, shifting the day back whenever
// the machine's timezone is ahead of UTC. Return the raw 'YYYY-MM-DD'
// string instead so no Date object/timezone math is involved.
types.setTypeParser(1082, value => value);

// TIMESTAMP WITHOUT TIME ZONE (oid 1114): stored/read in UTC (the DB
// session timezone), but pg's default parser serializes it with a
// trailing "Z" as-is. Convert to this machine's local timezone for display.
const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
types.setTypeParser(1114, value => {
    const utcDate = new Date(value.replace(' ', 'T') + 'Z');
    return utcDate.toLocaleString('sv-SE', { timeZone: localTimeZone, hour12: false }).replace(' ', 'T');
});

export const pool=new Pool({connectionString: process.env.DATABASE_URL});
