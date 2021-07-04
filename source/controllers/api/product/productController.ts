import * as express from 'express';
import {autoInjectable, delay, inject, injectable} from 'tsyringe';
import Controller from '../../../core/controller';
import ProductService from '../../../services/productService';

@autoInjectable()
class ProductController extends Controller {
	private readonly productService: ProductService;

	constructor(path: string, @inject(delay(() => ProductService)) productService?: ProductService) {
		super(path);

		this.initialiseRoutes();

		this.productService = productService;
	}

	public initialiseRoutes() {
		this.router.get(`${this.path}/getProduct`, this.getProduct);
	}

	getProduct = (request: express.Request, response: express.Response) => {};
}

export default ProductController;
