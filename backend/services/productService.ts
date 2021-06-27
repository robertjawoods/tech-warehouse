import { Product } from "../models/product";

class ProductService {
    getProduct(id: number): Product {
        var product = new Product();

        product.id = id;
        product.name = "test";

        return product;
    }

    getProducts(): Product[] {
        return [];
    }
}

export default ProductService;