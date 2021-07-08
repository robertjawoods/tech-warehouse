import * as path from 'path';
import * as FileHound from 'filehound';
import { autoInjectable } from 'tsyringe';
import { LogService } from '../services/logService';
import Controller from './controller';
@autoInjectable()
export class ControllerLoader {
    private readonly logger: LogService;

    constructor(logger?: LogService) {
        this.logger = logger;
    }

    /**
     *  Load controllers from the controller folder
     * @returns Promise<Controller[]>
     */
    public getControllers(): Promise<Controller[]> {
        return FileHound.create()
            .path(`${__dirname}/../controllers`)
            .ext('ts')
            .find().then(results => {
                return Promise.all(results.map(file => {
                    // Get directories for current controller
                    const directories: string[] = file.split(path.sep);

                    // Get the relative path of the controller
                    const rel: string = this.getRelativePath(directories);

                    // Return a promise of importing the controller class, then
                    return import(`./${rel}`).then(controller => {
                        const constructorName: string = Object.keys(controller)[0];

                        return new controller[constructorName]();
                    });
                }));
            });
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

}
