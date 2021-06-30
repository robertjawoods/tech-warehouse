import App from "./source/app";
import '@abraham/reflection';
import Controller from "./source/controllers/controller";
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

const start = () => {
    const app = new App(3000);

    app.init();

    app.listen();
};


start();