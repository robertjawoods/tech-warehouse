import { promisify } from "util";
import * as redis from 'redis';
import { RedisClient } from "redis";
import * as dotenv from 'dotenv';
import { injectable } from "inversify";


if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

@injectable()
export class RedisCache {
    private client: RedisClient;
    private getAsync: Function;
    private setAsync: Function;

    constructor() {
        this.client = redis.createClient({
            url: process.env.REDIS_CLIENT_URL,
        });

        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
    }

    public async set<T>(key: string, data: T, ttl?: number) {
        const serialised: string = JSON.stringify(data);
        await this.setAsync(key, serialised);

        this.client.expire(key, ttl || 60);
    }

    public async get<T>(key: string): Promise<T> {
        const result: string = await this.getAsync(key);

        const object: T = JSON.parse(result);

        return object;
    }
}