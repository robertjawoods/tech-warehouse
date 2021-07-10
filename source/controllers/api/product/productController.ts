import { inject, injectable } from 'inversify';
import Controller from '../../../core/controller';
import { TypeSymbols } from '../../../core/IoC/types';
import ProductService from '../../../services/productService';

@injectable()
class ProductController extends Controller {
	private readonly productService: ProductService;

	constructor(@inject(TypeSymbols.ProductService) productService?: ProductService) {
		super();

		this.basePath = '/api/product';

		this.initialiseRoutes();

		this.productService = productService;
	}

	public initialiseRoutes() { }
}

export default ProductController;
