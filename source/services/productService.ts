
import { autoInjectable } from "tsyringe";
import { IProduct } from "../models/interfaces/IProduct";
import { Perspective, ProductImageType } from "../models/interfaces/IProductImage";
import { ProductRepository } from "../repositories/productRepository";
import { IProductImageService } from "./interfaces/IProductImageService";

@autoInjectable()
class ProductService {
    productRepository: ProductRepository;
    productImageService: IProductImageService;

    constructor(productRepository?: ProductRepository, productImageService?: IProductImageService) {
        this.productRepository = productRepository;
        this.productImageService = productImageService;
    }

    async getProduct(id: string): Promise<IProduct> {
        var product = await this.productRepository.getProduct(id);

        var path = this.productImageService.getProductImage({
            id: id,
            imageType: ProductImageType.Hero,
            perspective: Perspective.Front
        });

        return product;
    }

    getProducts(): IProduct[] {
        return [];
    }
}

export default ProductService;