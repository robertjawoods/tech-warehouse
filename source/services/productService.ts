import { autoInjectable } from 'tsyringe';
import { IProduct } from '../models/interfaces/IProduct';
import { Perspective, ProductImageType } from '../models/interfaces/IProductImage';
import { ProductRepository } from '../repositories/productRepository';
import { IProductImageService } from './interfaces/IProductImageService';
import { container } from './../core/IoC/container';

@autoInjectable()
class ProductService {
	productRepository: ProductRepository;
	productImageService: IProductImageService;

	constructor() {
		this.productRepository = container.resolve(ProductRepository);
		this.productImageService = container.resolve('IProductImageService');
	}

	async getProduct(id: number): Promise<IProduct> {
		const product: IProduct = await this.productRepository.getProduct(id);

		console.log(product);

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
