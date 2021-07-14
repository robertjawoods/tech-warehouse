import * as express from 'express';
import { Controller, Get } from '@overnightjs/core';
import ProductService from '../../services/productService';
import { IProduct } from '../../models/interfaces/IProduct';
import { container } from '../../core/IoC/inversify.config';
import { BaseModel } from '../../models/baseModel';
@Controller('product')
class ProductDisplayController {
	private readonly productService: ProductService;

	constructor() {
		this.productService = container.resolve(ProductService);
	}

	@Get(':id(\\d+)/')
	async index(request: express.Request, response: express.Response) {
		const productID = Number.parseInt(request.params.id);

		const product: IProduct = await this.productService.getProduct(productID);

		const model = await new BaseModel<IProduct>().setData(product);

		response.render('product/index', { model });
	}
}

export default ProductDisplayController;
