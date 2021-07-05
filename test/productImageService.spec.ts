import * as assert from 'assert';
import { ProductImageServiceFactory } from '../source/core/factories/productImageServiceFactory';
import { Perspective, ProductImageRequest, ProductImageType } from '../source/models/interfaces/IProductImage';
import { IProductImageService } from '../source/services/interfaces/IProductImageService';

let sut: IProductImageService = ProductImageServiceFactory.getImageService();

describe('FileSystemProductImageService', function () {
    describe('#getImage()', function () {
        it('should return 123456-hero-front.jpg', async function () {
            let expected: string = '123456-hero-front.jpg';
            let actual: string = await sut.getProductImage(new ProductImageRequest("123456", Perspective.Front, ProductImageType.Hero));

            assert.strictEqual(actual, expected);
        });
    });

    describe('#getImages() when not given image type or perspective', function () {
        it('should return', async function () {
            let expected: string[] = [
                '123456-hero-front.jpg',
                '123456-hero-back.jpg',
                '123456-hero-left.jpg',
                '123456-hero-right.jpg',
                '123456-carousel-front.jpg',
                '123456-carousel-back.jpg',
                '123456-carousel-left.jpg',
                '123456-carousel-right.jpg'
            ];

            let actual: string[] = await sut.getProductImages(new ProductImageRequest('123456'));

            console.log(actual);

            assert.strictEqual(actual.length, expected.length);

            for (let i = 0; i < expected.length; i++) {
                assert.strictEqual(actual[i], expected[i]);
            }
        })
    });


    describe('#getImages() when not given perspective', function () {
        it('should return', async function () {
            let expected: string[] = [
                '123456-hero-front.jpg',
                '123456-hero-back.jpg',
                '123456-hero-left.jpg',
                '123456-hero-right.jpg'
            ];

            let actual: string[] = await sut.getProductImages(new ProductImageRequest('123456', null, ProductImageType.Hero));

            console.log(actual);

            assert.strictEqual(actual.length, expected.length);

            for (let i = 0; i < expected.length; i++) {
                assert.strictEqual(actual[i], expected[i]);
            }
        })
    });

    describe('#getImages() when not given type', function () {
        it('should return', async function () {
            let expected: string[] = [
                '123456-hero-front.jpg',
                '123456-carousel-front.jpg',
            ];

            let actual: string[] = await sut.getProductImages(new ProductImageRequest('123456', Perspective.Front, null));

            console.log(actual);

            assert.strictEqual(actual.length, expected.length);

            for (let i = 0; i < expected.length; i++) {
                assert.strictEqual(actual[i], expected[i]);
            }
        })
    });
});