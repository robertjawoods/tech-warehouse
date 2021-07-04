import * as path from 'path';
import Controller from './controller';
import * as FileHound from "filehound";

export class ControllerLoader {
    private getRelativePath(directories: string[]): string {
        let results: string[] = [];

        for (let i: number = directories.length - 1; i >= 0; i--) {
            const directory: string = directories[i];

            results = [directory, ...results];

            if (directory === 'controllers') {
                results = ['../', ...results];
                break;
            }
        }

        return results.join('/');
    }

    public async getControllers(): Promise<Controller[] | undefined> {
        const results: string[] = FileHound.create()
            .path(`${__dirname}/../controllers`)
            .ext('ts')
            .findSync();

        const controllers: Controller[] = new Array<Controller>();

        await Promise.all(results.map(file => {
            const directories: string[] = file.split(path.sep);

            const rel: string = this.getRelativePath(directories);

            return import(`./${rel}`).then(type => {
                const controllerIndex: number = directories.indexOf('controllers');

                const path: string[] = directories.filter((_, index) => index > controllerIndex);

                for (const key of Object.keys(type)) {
                    const route: string = `/${path.join('/').replace('Controller.ts', '')}`;
                    controllers.push(new type[key](route));
                }

                console.log(type);
            });
        }))

        return controllers;
    }
}
