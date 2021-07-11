import * as path from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { ControllerLoader } from './core/controllerLoader';
import * as viewHelpers from './views/viewHelpers';
import { TypeSymbols } from './core/IoC/types';
import { lazyInject } from './core/IoC/inversify.config';
import * as expressLayouts from 'express-ejs-layouts';
import { Server } from '@overnightjs/core';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

class App extends Server {
	private readonly port: number;
	@lazyInject(TypeSymbols.ControllerLoader)
	private readonly controllerLoader: ControllerLoader;

	constructor(port: number) {
		super();

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
		this.app.set('layout', path.join(__dirname, 'views', 'layouts', 'main'));

		this.app.use(expressLayouts);

		this.app.disable('x-powered-by');
	}

	private initialiseControllers() {
		this.controllerLoader.getControllers().then(controllers => {
			console.log(controllers);
			super.addControllers(controllers);
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
