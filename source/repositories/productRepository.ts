import { autoInjectable, delay, inject } from 'tsyringe';
import { IProduct } from '../models/interfaces/IProduct';
import { LogService } from '../services/logService';

import { container } from '../core/IoC/container';
import { ProductMapper } from '../core/mapping/productMapper';

@autoInjectable()
export class ProductRepository {
    private readonly logger: LogService;

    private readonly pool: any;

    constructor(@inject(delay(() => LogService)) logger?: LogService) {
        this.pool = container.resolve("Pool");

        this.logger = logger;
    }

    public async getProduct(productId: string): Promise<IProduct> {
        let client = await this.pool.connect();

        let result = await client.query('SELECT * FROM products WHERE id = $1', [productId]);

        return new ProductMapper<IProduct, string>().map(JSON.stringify(result.rows[0]))
    }
}
