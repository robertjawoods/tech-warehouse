import * as express from 'express';
import Controller from '../../core/controller';
import ProductService from '../../services/productService';
import { IProduct } from '../../models/interfaces/IProduct';
import { container } from './../../core/IoC/container';

class ProductDisplayController extends Controller {
	private readonly productService: ProductService;

	constructor() {
		super();

		this.initialiseRoutes();

		this.basePath = "/product"

		this.productService = container.resolve(ProductService);
	}

	public initialiseRoutes() {
		this.router.get(`/:id(\\d+)/`, this.index);
	}

	index = async (request: express.Request, response: express.Response) => {
		const productID = request.params.id;

		const product: IProduct = await this.productService.getProduct(productID);

		response.render('product/index', { product });
	};
}

export default ProductDisplayController;
