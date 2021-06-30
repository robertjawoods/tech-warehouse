import * as express from "express";
import Controller from "../../controller";
import { autoInjectable } from "tsyringe";
import ProductService from "../../../services/productService";

@autoInjectable()
class ProductController extends Controller {
    private productService: ProductService;

    constructor(productService?: ProductService) {
        super();
        this.path = "/api/product";

        this.initialiseRoutes();

        this.productService = productService;
    }

    public initialiseRoutes() {
        this.router.get(`${this.path}/getProduct`, this.getProduct);
    }

    getProduct = (request: express.Request, response: express.Response) => {

    }
}

export default ProductController;