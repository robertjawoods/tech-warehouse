import * as express from "express";
import Controller from "../../core/controller";
import ProductService from "../../services/productService";
import { IProduct } from "../../models/interfaces/IProduct";

class ProductDisplayController extends Controller {
    private productService: ProductService;

    constructor(path: string, productService?: ProductService) {
        super(path);

        this.initialiseRoutes();

        this.productService = productService;
    }

    public initialiseRoutes() {
        this.router.get(`${this.path}/:id(\\d+)/`, this.index);
    }

    index = async (request: express.Request, response: express.Response) => {
        var productID = request.params.id;

        var product: IProduct = await this.productService.getProduct(productID);

        response.render("product/index", { product });
    }
}

export default ProductDisplayController;