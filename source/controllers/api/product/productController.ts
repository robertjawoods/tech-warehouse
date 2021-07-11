import { inject, injectable } from 'inversify';
import { TypeSymbols } from '../../../core/IoC/types';
import ProductService from '../../../services/productService';

@injectable()
class ProductController {
	private readonly productService: ProductService;

	constructor(@inject(TypeSymbols.ProductService) productService?: ProductService) {

		this.productService = productService;
	}

	public initialiseRoutes() { }
}

export default ProductController;
