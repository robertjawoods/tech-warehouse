import * as express from 'express';

class Controller {
	public basePath: string;
	public path: string;

	// eslint-disable-next-line new-cap
	public router: express.Router = express.Router();
}

export default Controller;
