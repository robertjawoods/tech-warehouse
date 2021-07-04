import * as fs from 'fs';
import { IProductImageRequest, Perspective, ProductImageType } from '../models/interfaces/IProductImage';
import { IProductImageService } from './interfaces/IProductImageService';

export class FileSystemProductImageService implements IProductImageService {
	public async getProductImage(imageRequest: IProductImageRequest): Promise<string> {
		const fileName = '';

		return '';
	}

	public async getProductImages(imageRequest: IProductImageRequest): Promise<string> {
		return new Promise<string>(() => {
			return '';
		});
	}
}
