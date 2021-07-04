import * as mongoose from 'mongoose';
import {autoInjectable, delay, inject} from 'tsyringe';
import {IProduct} from '../models/interfaces/IProduct';
import {ProductModel} from '../models/product';
import {LogService} from '../services/logService';

@autoInjectable()
export class ProductRepository {
	private readonly logger: LogService;

	constructor(@inject(delay(() => LogService)) logger?: LogService) {
		this.logger = logger;
	}

	public async getProduct(productId: string): Promise<IProduct> {
		const product = await ProductModel.findOne({
			_id: productId
		});

		this.logger.instance.log('debug', `Got product: ${product._id}`);

		return product;
	}
}
