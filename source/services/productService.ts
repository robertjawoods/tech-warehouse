
import {autoInjectable, delay, inject} from 'tsyringe';
import {IProduct} from '../models/interfaces/IProduct';
import {Perspective, ProductImageType} from '../models/interfaces/IProductImage';
import {ProductRepository} from '../repositories/productRepository';
import {IProductImageService} from './interfaces/IProductImageService';
import {FileSystemProductImageService} from './productImageService';

@autoInjectable()
class ProductService {
	productRepository: ProductRepository;
	productImageService: IProductImageService;

	constructor(@inject(delay(() => ProductRepository)) productRepository?: ProductRepository, @inject(delay(() => FileSystemProductImageService)) productImageService?: IProductImageService) {
		this.productRepository = productRepository;
		this.productImageService = productImageService;
	}

	async getProduct(id: string): Promise<IProduct> {
		const product = await this.productRepository.getProduct(id);

		const path = this.productImageService.getProductImage({
			id,
			imageType: ProductImageType.Hero,
			perspective: Perspective.Front
		});

		return product;
	}

	getProducts(): IProduct[] {
		return [];
	}
}

export default ProductService;
