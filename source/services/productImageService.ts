import { IProductImageRequest, Perspective, ProductImageType } from "../models/interfaces/IProductImage";
import { IProductImageService } from "./interfaces/IProductImageService";
import * as fs from "fs";

export class FileSystemProductImageService implements IProductImageService {
    public async getProductImage(imageRequest: IProductImageRequest): Promise<string> {
        var fileName = "";

        return "";
    }

    public getProductImages(imageRequest: IProductImageRequest): Promise<string> {
        return new Promise<string>(() => {
            return "";
        });
    }
}