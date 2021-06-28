import { Model, model } from "mongoose";
import { Product, ProductModel } from "../models/product";

class ProductService {
    getProduct(id: number) {
        var product = new ProductModel();

        product.id = id;
        product.name = "test";
    }

    getProducts(): Product[] {
        return [];
    }
}

export default ProductService;