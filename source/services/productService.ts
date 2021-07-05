
import { autoInjectable, delay, inject, Lifecycle, scoped } from 'tsyringe';
import { IProduct } from '../models/interfaces/IProduct';
import { Perspective, ProductImageType } from '../models/interfaces/IProductImage';
import { ProductRepository } from '../repositories/productRepository';
import { IProductImageService } from './interfaces/IProductImageService';
import { FileSystemProductImageService } from './productImageService';
import { container } from './../core/IoC/container';

@autoInjectable()
class ProductService {
	productRepository: ProductRepository;
	productImageService: IProductImageService;

	constructor() {
		this.productRepository = container.resolve(ProductRepository);
		this.productImageService = container.resolve("IProductImageService");
	}

	async getProduct(id: string): Promise<IProduct> {
		let product: IProduct = await this.productRepository.getProduct(id);

		console.log(product);

		product.images = [await this.productImageService.getProductImage({
			id,
			imageType: ProductImageType.Hero,
			perspective: Perspective.Front
		})];

		console.log(product);

		return product;
	}

	getProducts(): IProduct[] {
		return [];
	}
}

export default ProductService;
