import 'reflect-metadata';
import { autoInjectable } from 'tsyringe';
import { ProductImageRequest, Perspective, ProductImageType } from '../models/interfaces/IProductImage';
import { IProductImageService } from './interfaces/IProductImageService';
import { LogService } from './logService';

@autoInjectable()
export class FileSystemProductImageService implements IProductImageService {
	private logger: LogService;

	constructor(logger?: LogService) {
		this.logger = logger;
	}

	public async getProductImage(imageRequest: ProductImageRequest): Promise<string> {
		let fileName: string = `${imageRequest.id}-${ProductImageType[imageRequest.imageType]}-${Perspective[imageRequest.perspective]}.jpg`;

		return fileName.toLowerCase();
	}

	public async getProductImages(imageRequest: ProductImageRequest): Promise<string[]> {
		let results: string[] = new Array<string>();

		this.logger.instance.log('debug', imageRequest);



		return results.map(result => result + '.jpg');
	}
}
