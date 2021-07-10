import * as path from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { ControllerLoader } from './core/controllerLoader';
import * as viewHelpers from './views/viewHelpers';
import { inject, injectable } from 'inversify';
import { TypeSymbols } from './core/IoC/types';
import { lazyInject } from './core/IoC/inversify.config';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

class App {
	private readonly app: express.Application;
	private readonly port: number;
	@lazyInject(TypeSymbols.ControllerLoader)
	private readonly controllerLoader: ControllerLoader;

	constructor(port: number) {
		this.app = express();
		this.port = port;

		this.initialiseMiddleware();

		this.initialiseControllers();

		this.registerViewHelpers();
	}

	private initialiseMiddleware() {
		this.app.use(express.json());
		this.app.use('/public', express.static('public'));

		this.app.set('view engine', 'ejs');
		this.app.set('views', path.join(__dirname, 'views'));

		this.app.disable('x-powered-by');
	}

	private initialiseControllers() {
		this.controllerLoader.getControllers().then(controllers => {
			for (const controller of controllers) {
				this.app.use(controller.basePath, controller.router);
			}
		}).catch(error => {
			console.error(error);
			throw new Error('Unable to load controllers');
		});
	}

	private registerViewHelpers() {
		this.app.locals.formatCurrency = viewHelpers.formatCurrency;
		this.app.locals.getMenuSection = viewHelpers.getMenuSection;
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening on http://localhost:${this.port}`);
		});
	}
}

export default App;
