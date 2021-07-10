import { Request, Response } from 'express';
import Controller from '../core/controller';
import { BaseModel } from '../models/baseModel';

export class IndexController extends Controller {
	constructor() {
		super();

		this.basePath = '/';

		this.initialiseRoutes();
	}

	index = async (_: Request, response: Response) => {
		const model = await new BaseModel<null>().setData(null);
		response.render('index', { model });
	};

	private initialiseRoutes() {
		this.router.get('/', this.index);
	}
}
