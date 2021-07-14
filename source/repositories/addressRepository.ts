import { Pool } from 'pg';
import { inject, injectable } from 'inversify';
import { TypeSymbols } from '../core/IoC/types';
import { RedisCache } from '../core/cache';
import { Address } from '../models/address';
import { BaseRepository } from './baseRepository';

@injectable()
export class AddressRepository extends BaseRepository {
	constructor(@inject(TypeSymbols.Pool) pool?: Pool, @inject(TypeSymbols.RedisCache) cache?: RedisCache) {
		super(pool, cache);
	}

	public async getAddressesForUser(userId: string): Promise<Address[]> {
		const cacheKey = `${userId}-addresses`;

		return this.queryMany(cacheKey, '', [userId]);
	}

	public async addAddress(userId: string, address: Address) {
		const sql = `insert into addresses(id, user_id, line_1, line_2, city, postcode, country) 
        values (default, $1, $2, $3, $4, $5, $6)`;

		this.query(sql, [userId, address.lineOne, address.lineTwo, address.city, address.postalCode, address.country]);
	}
}
