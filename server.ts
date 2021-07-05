import 'reflect-metadata';
import App from './source/app';
import { ControllerLoader } from './source/core/controllerLoader';
import { registerDependencies } from "./source/core/IoC/container";

registerDependencies();

const app = new App(3000);

app.listen();
