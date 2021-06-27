import App from "./app";
import "reflect-metadata";
import Controller from "./controllers/controller";
import glob = require("glob");

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

const app = new App(dynamicImport(), 3000);

app.listen();