import * as express from 'express';
import Controller from '../../core/controller';
import { ProductListingModel } from '../../models/productListing';

export class ProductListingController extends Controller {
    constructor() {
        super();

        this.basePath = '/products';

        this.initialiseRoutes();
    }

    getDivision = (request: express.Request, response: express.Response) => {
        let model = new ProductListingModel();

        model.divisionName = request.params.divisionName;

        response.render('product/listing', { model });
    };


    private initialiseRoutes() {
        this.router.get("/:divisionName", this.getDivision);
        this.router.get("/", (request: express.Request, response: express.Response) => {
            response.send("product index");
        })
    }

}
