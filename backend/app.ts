import * as express from "express";
import { convertTypeAcquisitionFromJson } from "typescript";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
    }

    private initialiseMiddleware() {
        this.app.use(express.json());
        this.app.use("/public", express.static("public"));
        this.app.set("view engine", "ejs");
    }

    private initialiseControllers(controllers) {
        controllers.then(resolved => {
            resolved.forEach(controller => {
                this.app.use("/", controller.router);
            });
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`);
        });
    }
}

export default App;