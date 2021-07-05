import * as path from 'path';
import * as FileHound from 'filehound';
import Controller from './controller';
import { autoInjectable } from 'tsyringe';
import { LogService } from '../services/logService';

@autoInjectable()
export class ControllerLoader {
    private logger: LogService;

    constructor(logger?: LogService) {
        this.logger = logger;
    }

    /**
     * Get the relative path from a directory tree.
     *
     * @param {string[]} directories The directory hierarchy
     * @return {string} The relative path to the file.
     */
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
    /**
     *  Load controllers from the controller folder
     * @returns Promise<Controller[] | undefined> 
     */
    public async getControllers(): Promise<Controller[] | undefined> {

        // Get all controller files
        let results: string[] = FileHound.create()
            .path(`${__dirname}/../controllers`)
            .ext('ts')
            .findSync();

        let controllers: Controller[] = [];

        // Resolve all returned promises
        await Promise.all(results.map(async file => {
            // get directories for current controller
            let directories: string[] = file.split(path.sep);

            // get the relative path of the controller
            let rel: string = this.getRelativePath(directories);

            // Return a promise of importing the controller class, then
            return import(`./${rel}`).then(type => {

                // get the index of "controller" in the directory hierarchy
                const controllerIndex: number = directories.indexOf('controllers');

                // route for this controller will be everything after the "controller" in the directory hierarchy
                let path: string[] = directories.filter((_, index) => index > controllerIndex);

                this.logger.instance.log('debug', `Imported ${rel}`)

                // importing the controller returns some kind of weird object that I can use the constructor on 
                for (const key of Object.keys(type)) {

                    // push the new controller to the array of controllers
                    controllers.push(new type[key]());
                }
            });
        }));

        return controllers;
    }
}
