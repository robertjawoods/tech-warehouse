import { Pool } from 'pg';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const connectionString = process.env.CONNECTION_STRING;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default new Pool({
	connectionString,
	ssl: {
		rejectUnauthorized: false
	}
});
