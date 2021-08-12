import { Client } from 'pg';

import { getDatabaseCredentials } from '../../../variables';

const { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } = getDatabaseCredentials();
const dbOptions = {
    host: PG_HOST,
    port: Number(PG_PORT),
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    connectionTimeoutMillis: 5000
};

export const connect = async () => {
    const client = new Client(dbOptions);
    await client.connect();
    return client;
}
