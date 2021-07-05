import { Request, Response } from 'express';
import Controller from '../core/controller';

export class IndexController extends Controller {
    constructor() {
        super();

        this.basePath = '/';

        this.initialiseRoutes();
    }

    index = (request: Request, response: Response) => {
        response.render('index');
    };

    private initialiseRoutes() {
        this.router.get('/', this.index);
    }
}
