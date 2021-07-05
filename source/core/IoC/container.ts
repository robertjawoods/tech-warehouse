import { container, Lifecycle } from 'tsyringe';
import { IProductImageService } from '../../services/interfaces/IProductImageService';
import { ProductImageServiceFactory } from '../factories/productImageServiceFactory';
import { ControllerLoader } from '../controllerLoader';
import Pool from '../data/pool';
import ProductService from '../../services/productService';
import { ProductRepository } from '../../repositories/productRepository';

export const registerDependencies = () => {
    container.register<IProductImageService>("IProductImageService", { useFactory: (_) => ProductImageServiceFactory.getImageService() });
    container.register<ControllerLoader>(ControllerLoader, { useClass: ControllerLoader });
    container.register<ProductService>(ProductService, { useClass: ProductService });
    container.register(ProductRepository, { useClass: ProductRepository });

    container.register("Pool", { useValue: Pool })
};

export { container };

