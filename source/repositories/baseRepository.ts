import { injectable } from 'inversify';
import { Client, Pool } from 'pg';
import { RedisCache } from '../core/cache';
import { Mapper } from '../core/mapping/Mapper';

@injectable()
export class BaseRepository {
	protected readonly cache: RedisCache;
	protected readonly pool: Pool;

	constructor(pool: Pool, cache: RedisCache) {
		this.cache = cache;
		this.pool = pool;
	}

	protected async queryMany<T>(cacheKey: string, query: string, parameters?: any[]): Promise<T> {
		// Try to get the item from the cache
		return this.tryFetchFromCache<T>(cacheKey)
			.then((item: T) => {
			// If the cache was missed
				if (!item) {
					return this.pool.connect()
						.then(async client => {
						// Get the data from the database
							return client.query(query, parameters);
						}).then((result => {
						// Map result to T
							return new Mapper().map<T>(result.rows);
						}));
				}

				return item;
			})
			.then(async (item: T) => {
				await this.cache.set(cacheKey, item);

				return item;
			});
	}

	protected async querySingle<T>(cacheKey: string, query: string, parameters?: any[]): Promise<T> {
		// Try to get the item from the cache
		return this.tryFetchFromCache<T>(cacheKey)
			.then((item: T) => {
			// If the cache was missed
				if (!item) {
					return this.pool.connect()
						.then(async client => {
						// Get the data from the database
							return client.query(query, parameters);
						}).then((result => {
						// Map result to T
							return new Mapper().map<T>(result.rows[0]);
						}));
				}

				return item;
			})
			.then(async (item: T) => {
				await this.cache.set(cacheKey, item);

				return item;
			});
	}

	protected async query(query: string, parameters: any) {
		return this.pool.connect()
			.then(client => {
				// Get the data from the database
				client.query(query, parameters);
			});
	}

	protected async tryFetchFromCache<T>(cacheKey: string): Promise<T> {
		const result = await this.cache.get<T>(cacheKey);

		return result;
	}
}
