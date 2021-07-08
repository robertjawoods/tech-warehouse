import * as express from 'express';
import Controller from '../../core/controller';
import { container } from '../../core/IoC/container';
import { IProduct } from '../../models/interfaces/IProduct';
import { ProductListingModel } from '../../models/productListing';
import ProductService from '../../services/productService';

export class ProductListingController extends Controller {
	private readonly productService: ProductService;

	constructor() {
		super();

		this.basePath = '/products';

		this.initialiseRoutes();

		this.productService = container.resolve(ProductService);
	}

	getDivision = async (request: express.Request, response: express.Response) => {
		const model = new ProductListingModel();

		const categoryName = request.params.divisionName;

		model.products = await this.productService.getProducts(categoryName);

		model.divisionName = categoryName;

		response.render('product/listing', { model });
	};

	private initialiseRoutes() {
		this.router.get('/:divisionName', this.getDivision);
		this.router.get('/', (_: express.Request, response: express.Response) => {
			response.send('product index');
		});
	}
}
