import * as assert from 'assert';
import { ProductImageServiceFactory } from '../source/core/factories/productImageServiceFactory';
import { Perspective, ProductImageRequest, ProductImageType } from '../source/models/interfaces/IProductImage';
import { IProductImageService } from '../source/services/interfaces/IProductImageService';

const sut: IProductImageService = ProductImageServiceFactory.getImageService();

describe('FileSystemProductImageService', () => {
	describe('#getImage()', () => {
		it('should return 123456-hero-front.jpg', async () => {
			const expected = '123456-hero-front.jpg';
			const actual: string = await sut.getProductImage(new ProductImageRequest('123456', Perspective.Front, ProductImageType.Hero));

			assert.strictEqual(actual, expected);
		});
	});

	describe('#getImages() when not given image type or perspective', () => {
		it('should return', async () => {
			const expected: string[] = [
				'123456-hero-front.jpg',
				'123456-hero-back.jpg',
				'123456-hero-left.jpg',
				'123456-hero-right.jpg',
				'123456-carousel-front.jpg',
				'123456-carousel-back.jpg',
				'123456-carousel-left.jpg',
				'123456-carousel-right.jpg'
			];

			const actual: string[] = await sut.getProductImages(new ProductImageRequest('123456'));

			console.log(actual);

			assert.strictEqual(actual.length, expected.length);

			for (const [i, element] of expected.entries()) {
				assert.strictEqual(actual[i], element);
			}
		});
	});

	describe('#getImages() when not given perspective', () => {
		it('should return', async () => {
			const expected: string[] = [
				'123456-hero-front.jpg',
				'123456-hero-back.jpg',
				'123456-hero-left.jpg',
				'123456-hero-right.jpg'
			];

			const actual: string[] = await sut.getProductImages(new ProductImageRequest('123456', null, ProductImageType.Hero));

			console.log(actual);

			assert.strictEqual(actual.length, expected.length);

			for (const [i, element] of expected.entries()) {
				assert.strictEqual(actual[i], element);
			}
		});
	});

	describe('#getImages() when not given type', () => {
		it('should return', async () => {
			const expected: string[] = [
				'123456-hero-front.jpg',
				'123456-carousel-front.jpg'
			];

			const actual: string[] = await sut.getProductImages(new ProductImageRequest('123456', Perspective.Front, null));

			console.log(actual);

			assert.strictEqual(actual.length, expected.length);

			for (const [i, element] of expected.entries()) {
				assert.strictEqual(actual[i], element);
			}
		});
	});
});
