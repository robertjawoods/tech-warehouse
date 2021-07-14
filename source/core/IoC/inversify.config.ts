
import { Container } from 'inversify';

import { ProductImageServiceFactory } from '../factories/productImageServiceFactory';
import { ControllerLoader } from '../controllerLoader';
import Pool from '../data/pool';
import { IProductImageService } from '../../services/interfaces/IProductImageService';
import ProductService from '../../services/productService';
import { ProductRepository } from '../../repositories/productRepository';
import { CategoryRepository } from '../../repositories/categoryRepository';
import { CategoryService } from '../../services/categoryService';
import { TypeSymbols } from './types';
import { LogService } from '../../services/logService';
import getDecorators from 'inversify-inject-decorators';
import { UserRepository } from '../../repositories/userRepository';
import { RedisCache } from '../cache';
import { AddressRepository } from '../../repositories/addressRepository';
import { AddressService } from '../../services/addressService';

const container = new Container();
const { lazyInject } = getDecorators(container, false);

export const registerDependencies = () => {
	container.bind<LogService>(TypeSymbols.LogService).to(LogService).inSingletonScope();
	container.bind<ControllerLoader>(TypeSymbols.ControllerLoader).to(ControllerLoader);
	container.bind<typeof Pool>(TypeSymbols.Pool).toConstantValue(Pool);
	container.bind<ProductService>(TypeSymbols.ProductService).to(ProductService);
	container.bind<IProductImageService>(TypeSymbols.IProductImageService).toFactory(context => (_) => ProductImageServiceFactory.getImageService());
	container.bind<CategoryService>(TypeSymbols.CategoryService).to(CategoryService);
	container.bind<AddressService>(TypeSymbols.AddressService).to(AddressService);

	container.bind<ProductRepository>(TypeSymbols.ProductRepository).to(ProductRepository);
	container.bind<CategoryRepository>(TypeSymbols.CategoryRepository).to(CategoryRepository);
	container.bind<UserRepository>(TypeSymbols.UserRepository).to(UserRepository);
	container.bind<AddressRepository>(TypeSymbols.AddressRepository).to(AddressRepository);

	container.bind<RedisCache>(TypeSymbols.RedisCache).to(RedisCache).inSingletonScope();
};

export { container, lazyInject };

