import {IProductImageService} from '../../services/interfaces/IProductImageService';
import {FileSystemProductImageService} from '../../services/productImageService';

export class ProductImageServiceFactory {
	public static getImageService(): IProductImageService {
		return new FileSystemProductImageService();
	}
}
