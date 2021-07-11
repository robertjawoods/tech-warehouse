import { Request, Response } from 'express';
import { BaseModel } from '../models/baseModel';
import { Controller, Get } from '@overnightjs/core';

@Controller('/')
export class IndexController {
	constructor() {

	}

	@Get('/')
	index = async (_: Request, response: Response) => {
		const model = await new BaseModel<null>().setData(null);
		response.render('index', { model });
	};
}
