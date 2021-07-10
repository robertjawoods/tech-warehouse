
import { IProduct } from '../models/interfaces/IProduct';
import { LogService } from '../services/logService';
import { ProductMapper } from '../core/mapping/productMapper';
import { PoolClient, Pool } from 'pg'
import { TypeSymbols } from '../core/IoC/types';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductRepository {
    private readonly logger: LogService;

    private readonly pool: Pool;
    private readonly productMapper: ProductMapper<IProduct, string>;


    constructor(@inject(TypeSymbols.LogService) logger?: LogService, @inject(TypeSymbols.Pool) pool?: Pool) {
        this.pool = pool;

        this.productMapper = new ProductMapper<IProduct, string>();
        this.logger = logger;
    }

    public async getProduct(productId: number): Promise<IProduct> {
        const client: PoolClient = await this.pool.connect();

        const result = await client.query('SELECT * FROM products WHERE id = $1 LIMIT 1', [productId]);

        return this.productMapper.map(JSON.stringify(result.rows[0]));
    }

    public async getProductsByCategoryId(categoryId: number): Promise<IProduct[]> {
        const client: PoolClient = await this.pool.connect();

        const result = await client.query('SELECT * FROM products WHERE category_id = $1', [categoryId]);

        let products: IProduct[] = [];
        for (let row of result.rows) {
            products = [...products, this.productMapper.map(JSON.stringify(row))];
        }

        return products;
    }

    public async getProductsByCategoryName(categoryName: string): Promise<IProduct[]> {
        const client: PoolClient = await this.pool.connect();

        const result = await client.query('select p.id, p.name, p.price, p.description, p.currencyCode from products p \
        join categories c on c.id = p.category_id\
        where c.name = $1', [categoryName]);

        let products: IProduct[] = [];
        for (let row of result.rows) {
            products = [...products, this.productMapper.map(JSON.stringify(row))];
        }

        return products;
    }
}
