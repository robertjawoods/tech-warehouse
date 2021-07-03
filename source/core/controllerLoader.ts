import * as path from "path";
import ProductController from "../controllers/api/product/productController";
import Controller from "./controller";
const FileHound = require("FileHound");

export class ControllerLoader {
    public async getControllers(): Promise<Controller[]> {
        let controllers: Controller[];

        FileHound.create()
            .path(`${__dirname}/../controllers`)
            .ext("ts")
            .find()
            .then((files) => Promise.all(files.map(file => {
                let directories: string[] = file.split(path.sep);

                return this.getRelativePath(directories)
                    .then(rel => import(`./${rel}`))
                    .then(types => {
                        console.log(types);

                        for (let type of types) {
                            controllers = [...controllers, new type()];
                        }
                    });;
            })));

        /* .then((files) => {
        //     for (let file of files) {
        //         let directories: string[] = file.split(path.sep);
        //         let rel = this.getRelativePath(directories)

        //         import(`./${rel}`)
        //             .then(types => {
        //                 console.log(types);

        //                 for (let type of types) {
        //                     controllers = [...controllers, new type()];
        //                 }
        //             });
        //     }
        // }); */

        return controllers;
    }

    private async getRelativePath(directories: string[]): Promise<string> {
        let results: string[] = new Array();

        for (let i: number = directories.length - 1; i >= 0; i--) {
            let directory: string = directories[i];

            results = [directory, ...results];

            if (directory === "controllers") {
                results = ["../", ...results]
                break;
            }
        }

        return results.join("/");
    }

    public async sadBoiImport(): Promise<Controller[] | undefined> {
        let results = FileHound.create()
            .path(`${__dirname}/../controllers`)
            .ext("ts")
            .findSync();

        let controllers: Controller[] = new Array<Controller>();
        for (let file of results) {
            let directories: string[] = file.split(path.sep);

            let rel: string = await this.getRelativePath(directories);
            let type = await import(`./${rel}`);

            let controllerIndex: number = directories.indexOf("controllers");

            let route: string[] = directories.filter((_, index) => index > controllerIndex);
            Object.keys(type).forEach(k => {
                let r = `/${route.join("/").replace("Controller.ts", "")}`;
                controllers.push(new type[k](r));
            })

            console.log(type);
        }

        return controllers;
    }
}