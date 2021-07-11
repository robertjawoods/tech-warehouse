import * as express from 'express';
import ProductService from '../../services/productService';
import { IProduct } from '../../models/interfaces/IProduct';
import { container } from '../../core/IoC/inversify.config';
import { Controller, Get } from '@overnightjs/core';
@Controller('product')
class ProductDisplayController {
	private readonly productService: ProductService;

	constructor() {
		this.productService = container.resolve(ProductService);
	}


	@Get(':id(\\d+)/')
	async index(request: express.Request, response: express.Response) {
		const productID = parseInt(request.params.id);

		const product: IProduct = await this.productService.getProduct(productID);

		response.render('product/index', { product });
	};
}

export default ProductDisplayController;
