
import { PoolClient, Pool } from 'pg';
import { inject, injectable } from 'inversify';
import { IProduct } from '../models/interfaces/IProduct';
import { LogService } from '../services/logService';
import { TypeSymbols } from '../core/IoC/types';
import { RedisCache } from '../core/cache';
import { Mapper } from '../core/mapping/Mapper';
import { BaseRepository } from './baseRepository';

@injectable()
export class ProductRepository extends BaseRepository {
	private readonly logger: LogService;
	private readonly productMapper: Mapper;

	constructor(@inject(TypeSymbols.LogService) logger?: LogService, @inject(TypeSymbols.Pool) pool?: Pool, @inject(TypeSymbols.RedisCache) cache?: RedisCache) {
		super(pool, cache);
		this.productMapper = new Mapper();
		this.logger = logger;
	}

	public async getProduct(productId: number): Promise<IProduct> {
		const cacheKey = `${productId}-product`;
		return this.querySingle(cacheKey, 'SELECT * FROM products WHERE id = $1 LIMIT 1', [productId]);
	}

	public async getProductsByCategoryId(categoryId: number): Promise<IProduct[]> {
		const cacheKey = `${categoryId.toString()}-products`;

		return this.queryMany(cacheKey, 'SELECT * FROM products WHERE category_id = $1', [categoryId]);
	}

	public async getProductsByCategoryName(categoryName: string): Promise<IProduct[]> {
		const cacheKey = `${categoryName}-products`;
		const sql = `
        select p.id, p.name, p.price, p.description, p.currencyCode 
        from products p join categories c
            on c.id = p.category_id
        where c.name = $1`;

		return this.queryMany(cacheKey, sql, [categoryName]);
	}
}
