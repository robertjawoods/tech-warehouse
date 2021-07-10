import { inject, injectable } from 'inversify';
import { TypeSymbols } from '../core/IoC/types';
import { Perspective, ProductImageRequest, ProductImageType } from '../models/interfaces/IProductImage';
import { IProductImageService } from './interfaces/IProductImageService';
import { LogService } from './logService';

@injectable()
export class FileSystemProductImageService implements IProductImageService {
	private readonly logger: LogService;

	constructor(@inject(TypeSymbols.LogService) logger?: LogService) {
		this.logger = logger;
	}

	public async getProductImage(imageRequest: ProductImageRequest): Promise<string> {
		const fileName = `${imageRequest.id}-${ProductImageType[imageRequest.imageType]}-${Perspective[imageRequest.perspective]}.png`;

		return fileName.toLowerCase();
	}

	public async getProductImages(imageRequest: ProductImageRequest): Promise<string[]> {
		const results: string[] = new Array<string>();

		this.logger.instance.log('debug', imageRequest);

		return results.map(result => result + '.png');
	}
}
