import * as express from "express";
import Controller from "../controller";
import { autoInjectable } from "tsyringe";
import ProductService from "../../services/productService";
import { Product } from "../../models/product";

@autoInjectable()
class ProductDisplayController extends Controller {
    private productService: ProductService;

    constructor(productService?: ProductService) {
        super();
        this.path = "/productdisplay";

        this.initialiseRoutes();

        this.productService = productService;
    }

    public initialiseRoutes() {
        this.router.get(`${this.path}/:id(\\d+)/`, this.index);
    }

    index = (request: express.Request, response: express.Response) => {
        var productID = parseInt(request.params.id);

        var product: Product = this.productService.getProduct(productID);

        response.render("product/index", product);
    }
}

export default ProductDisplayController;