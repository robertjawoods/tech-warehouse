import * as express from 'express';
import Controller from '../../core/controller';

export class ProductListController extends Controller {
	constructor(path: string) {
		super(path);

		this.initialiseRoutes();
	}

	private initialiseRoutes() {
		this.router.get(this.path, this.index);
	}

	index = (request: express.Request, response: express.Response) => {
		response.render('index');
	};
}
