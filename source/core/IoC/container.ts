import { container } from 'tsyringe';
import { ProductImageServiceFactory } from '../factories/productImageServiceFactory';
import { ControllerLoader } from '../controllerLoader';
import Pool from '../data/pool';
import { IProductImageService } from '../../services/interfaces/IProductImageService';
import ProductService from '../../services/productService';
import { ProductRepository } from '../../repositories/productRepository';
import { CategoryRepository } from '../../repositories/categoryRepository';

export const registerDependencies = () => {
	container.register<ControllerLoader>(ControllerLoader, { useClass: ControllerLoader });

	registerServices();

	registerRepositories();

	container.register('Pool', { useValue: Pool });
};

const registerServices = () => {
	container.register<ProductService>(ProductService, { useClass: ProductService });

	container.register<IProductImageService>('IProductImageService', { useFactory: _ => ProductImageServiceFactory.getImageService() });
}

const registerRepositories = () => {
	container.register(ProductRepository, { useClass: ProductRepository });
	container.register(CategoryRepository, { useClass: CategoryRepository });
}

export { container };

