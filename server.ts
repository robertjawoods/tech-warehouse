import 'reflect-metadata';
import App from './source/app';
import {ControllerLoader} from './source/core/controllerLoader';

const app = new App(3000, new ControllerLoader());

app.listen();
