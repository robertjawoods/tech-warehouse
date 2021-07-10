import 'reflect-metadata';
import * as assert from 'assert';
import { ProductImageServiceFactory } from '../source/core/factories/productImageServiceFactory';
import { Perspective, ProductImageRequest, ProductImageType } from '../source/models/interfaces/IProductImage';
import { IProductImageService } from '../source/services/interfaces/IProductImageService';

const sut: IProductImageService = ProductImageServiceFactory.getImageService();

describe('FileSystemProductImageService', () => {
	describe('#getImage()', () => {
		it('should return 123456-hero-front.png', async () => {
			const expected = '123456-hero-front.png';
			const actual: string = await sut.getProductImage(new ProductImageRequest(123456, Perspective.Front, ProductImageType.Hero));

			assert.strictEqual(actual, expected);
		});
	});

	describe('#getImages() when not given image type or perspective', () => {
		it('should return', async () => {
			const expected: string[] = [
				'123456-hero-front.png',
				'123456-hero-back.png',
				'123456-hero-left.png',
				'123456-hero-right.png',
				'123456-carousel-front.png',
				'123456-carousel-back.png',
				'123456-carousel-left.png',
				'123456-carousel-right.png'
			];

			const actual: string[] = await sut.getProductImages(new ProductImageRequest(123456));

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
				'123456-hero-front.png',
				'123456-hero-back.png',
				'123456-hero-left.png',
				'123456-hero-right.png'
			];

			const actual: string[] = await sut.getProductImages(new ProductImageRequest(123456, null, ProductImageType.Hero));

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
				'123456-hero-front.png',
				'123456-carousel-front.png'
			];

			const actual: string[] = await sut.getProductImages(new ProductImageRequest(123456, Perspective.Front, null));

			console.log(actual);

			assert.strictEqual(actual.length, expected.length);

			for (const [i, element] of expected.entries()) {
				assert.strictEqual(actual[i], element);
			}
		});
	});
});
