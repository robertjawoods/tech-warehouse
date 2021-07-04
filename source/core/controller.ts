import * as express from 'express';

class Controller {
	public path: string;
	public router: express.Router = express.Router();

	constructor(path: string) {
		this.path = path;
	}
}

export default Controller;
