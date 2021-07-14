import { Pool } from 'pg';
import { inject, injectable } from 'inversify';
import { TypeSymbols } from '../core/IoC/types';
import { UserModel } from '../models/user';
import { RedisCache } from '../core/cache';
import { Mapper } from '../core/mapping/Mapper';

@injectable()
export class UserRepository {
	private readonly pool: Pool;
	private readonly cache: RedisCache;

	constructor(@inject(TypeSymbols.Pool) pool?: Pool, @inject(TypeSymbols.RedisCache) cache?: RedisCache) {
		this.pool = pool;
		this.cache = cache;
	}

	public async getUser(userId: string): Promise<UserModel> {
		let user: UserModel = await this.cache.get(userId);

		if (!user) {
			const sql = `SELECT * FROM users
            WHERE id = $1;`;

			const client = await this.pool.connect();

			const result = await client.query(sql, [userId]);

			user = new Mapper().map(result.rows[0]);

			this.cache.set(userId, user);
		}

		return user;
	}

	public async createUser(user: UserModel) {
		const sql = `INSERT INTO users (id, first_name, last_name, email)
            VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING`;

		const client = await this.pool.connect();

		const result = await client.query(sql, [user.id, user.first_name, user.last_name, user.email]);
	}
}
