import "reflect-metadata";
import App from "./source/app";
import Controller from "./source/core/controller";
import glob = require("glob");
import { ControllerLoader } from "./source/core/controllerLoader";

const dynamicImport = async (): Promise<Controller[]> => {
    let results = [];

    var files = await glob.sync("controllers/**/*.ts", {});

    for (var key in Object.keys(files)) {
        var type = await import(`./${files[key]}`);

        Object.keys(type).forEach(k => {
            results.push(new type[k]())
        })
    }

    return results;
}

const app = new App(3000, new ControllerLoader());

app.listen();