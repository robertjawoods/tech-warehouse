import { IProduct } from '../models/interfaces/IProduct';
import { Perspective, ProductImageType } from '../models/interfaces/IProductImage';
import { ProductRepository } from '../repositories/productRepository';
import { IProductImageService } from './interfaces/IProductImageService';
import { inject, injectable } from 'inversify';
import { TypeSymbols } from '../core/IoC/types';

@injectable()
class ProductService {
	productRepository: ProductRepository;
	productImageService: IProductImageService;

	constructor(@inject(TypeSymbols.ProductRepository) productRepository?: ProductRepository, @inject(TypeSymbols.IProductImageService) productImageService?: () => IProductImageService) {
		this.productRepository = productRepository;
		this.productImageService = productImageService();
	}

	async getProduct(id: number): Promise<IProduct> {
		const product: IProduct = await this.productRepository.getProduct(id);

		product.images = [await this.productImageService.getProductImage({
			id,
			imageType: ProductImageType.Hero,
			perspective: Perspective.Front
		})];

		console.log(product);

		return product;
	}

	async getProducts(categoryName: string): Promise<IProduct[]> {
		const products: IProduct[] = await this.productRepository.getProductsByCategoryName(categoryName);

		for (let product of products) {
			product.images = [await this.productImageService.getProductImage({
				id: product.id,
				imageType: ProductImageType.Hero,
				perspective: Perspective.Front
			})];
		}
		return products;
	}
}

export default ProductService;
