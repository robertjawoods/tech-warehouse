import { ProductImageRequest } from "../../models/interfaces/IProductImage";

export interface IProductImageService {
	getProductImage(imageRequest: ProductImageRequest): Promise<string>;
	getProductImages(imageRequest: ProductImageRequest): Promise<string[]>;
}
