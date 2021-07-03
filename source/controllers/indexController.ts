import { Request, Response } from "express";
import Controller from "../core/controller";

export class IndexController extends Controller {
    constructor(path: string) {
        super(path);

        this.path = "";

        this.initialiseRoutes();
    }

    private initialiseRoutes() {
        this.router.get(this.path, this.index);
    }

    index = (request: Request, response: Response) => {
        response.render("index");
    };
}