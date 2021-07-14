import * as express from 'express';
import { Controller, Get } from '@overnightjs/core';
import { container } from '../../core/IoC/inversify.config';
import { IProduct } from '../../models/interfaces/IProduct';
import { ProductListingModel } from '../../models/productListing';
import ProductService from '../../services/productService';
@Controller('products')
export class ProductListingController {
	private readonly productService: ProductService;

	constructor() {
		this.productService = container.resolve(ProductService);
	}

	@Get(':divisionName')
	async getDivision(request: express.Request, response: express.Response) {
		const categoryName = request.params.divisionName;

		const products = await this.productService.getProducts(categoryName);

		const model = new ProductListingModel();

		console.time('cache');
		await model.setData([categoryName, products]);
		console.timeEnd('cache');

		response.render('product/listing', { model });
	}
}
