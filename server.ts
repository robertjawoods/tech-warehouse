import 'reflect-metadata';
import App from './source/app';
import { registerDependencies } from './source/core/IoC/inversify.config';

registerDependencies();

const port: number = Number.parseInt(process.env.PORT) || 3000;

const app = new App(port);

app.listen();

