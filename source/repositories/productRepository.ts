import * as mongoose from "mongoose";
import { autoInjectable } from "tsyringe";
import { IProduct } from "../models/interfaces/IProduct";
import { ProductModel } from "../models/product";
import { LogService } from "../services/logService";

@autoInjectable()
export class ProductRepository {
    private logger: LogService;

    constructor(logger?: LogService) {
        this.logger = logger;
    }

    public async getProduct(productId: string): Promise<IProduct> {
        var product = await ProductModel.findOne({
            _id: productId
        });

        this.logger.instance.log("debug", `Got product: ${product._id}`);

        return product;
    }
}