import { autoInjectable, delay, inject } from 'tsyringe';
import Controller from '../../../core/controller';
import ProductService from '../../../services/productService';

@autoInjectable()
class ProductController extends Controller {
	private readonly productService: ProductService;

	constructor(@inject(delay(() => ProductService)) productService?: ProductService) {
		super();

		this.basePath = '/api/product';

		this.initialiseRoutes();

		this.productService = productService;
	}

	public initialiseRoutes() {}
}

export default ProductController;
