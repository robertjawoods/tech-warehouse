import { Pool } from 'pg';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export default new Pool({
    user: 'wwydkfabdgnmmu',
    password: 'c9e120e2086c7fd473efa5a07404c869d1a56918ae6d5014808b89e592fee5c5',
    host: 'ec2-54-74-14-109.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd1hpnidhq5pfke',
    ssl: {
        rejectUnauthorized: false
    }
});