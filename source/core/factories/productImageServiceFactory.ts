import { IProductImageService } from '../../services/interfaces/IProductImageService';
import { FileSystemProductImageService } from '../../services/productImageService';

export const ProductImageServiceFactory = {
	getImageService(): IProductImageService {
		return new FileSystemProductImageService();
	}
};
