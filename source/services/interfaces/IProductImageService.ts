import {IProductImageRequest, Perspective, ProductImageType} from '../../models/interfaces/IProductImage';

export interface IProductImageService {
	getProductImage(imageRequest: IProductImageRequest): Promise<string>;
	getProductImages(imageRequest: IProductImageRequest): Promise<string>;
}
