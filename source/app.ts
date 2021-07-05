import * as path from 'path';
import * as express from 'express';
import { connect } from 'mongoose';
import { autoInjectable, delay, inject, injectable } from 'tsyringe';
import * as dotenv from 'dotenv';
import { ControllerLoader } from './core/controllerLoader';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

@autoInjectable()
class App {
    private readonly app: express.Application;
    private readonly port: number;
    private readonly controllerLoader: ControllerLoader;

    constructor(port: number, controllerLoader?: ControllerLoader) {
        this.app = express();
        this.port = port;

        this.controllerLoader = controllerLoader;

        this.initialiseMiddleware();

        this.initialiseControllers();

        this.app.set('views', path.join(__dirname, 'views'));
    }

    private initialiseMiddleware() {
        this.app.use(express.json());
        this.app.use('/public', express.static('public'));
        this.app.set('view engine', 'ejs');

        this.app.disable('x-powered-by');
    }

    private initialiseControllers() {
        this.controllerLoader.getControllers().then(controllers => {
            for (const controller of controllers) {
                this.app.use(controller.basePath, controller.router);
            }
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`);
        });
    }

    private async connectToMongo() {
        await connect(process.env.MONGO_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, error => {
            if (error) {
                console.log(error);
            }
        });
    }
}

export default App;
