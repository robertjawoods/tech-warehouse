import { inject, injectable } from 'inversify';
import { IProduct } from '../models/interfaces/IProduct';
import { Perspective, ProductImageType } from '../models/interfaces/IProductImage';
import { ProductRepository } from '../repositories/productRepository';
import { TypeSymbols } from '../core/IoC/types';
import { IProductImageService } from './interfaces/IProductImageService';

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

		return product;
	}

	async getCategoryProducts(categoryName: string): Promise<IProduct[]> {
		const products: IProduct[] = await this.productRepository.getProductsByCategoryName(categoryName);

		for (const product of products) {
			product.images = [await this.productImageService.getProductImage({
				id: product.id,
				imageType: ProductImageType.Hero,
				perspective: Perspective.Front
			})];
		}

		return products;
	}

	async getProducts(parentId: number, categoryIds: number[]): Promise<IProduct[]> {
		const products: IProduct[] = await this.productRepository.getProductsByCategoryIds(parentId, categoryIds);

		for (const product of products) {
			product.images = [await this.productImageService.getProductImage({
				id: product.id,
				imageType: ProductImageType.Hero,
				perspective: Perspective.Front
			})];
		}


		return products;
	}

	async addProduct(product: IProduct) {

	}

	async addProducts(products: IProduct[]) {

	}
}

export default ProductService;
