import { Request, Response } from "express";
import Controller from "./controller";

export class IndexController extends Controller {
    constructor() {
        super();

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