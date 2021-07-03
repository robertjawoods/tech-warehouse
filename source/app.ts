import * as express from "express";
import { connect } from "mongoose";
import { delay, inject } from "tsyringe";
import Controller from "./core/controller";
import { ControllerLoader } from "./core/controllerLoader";
import { ProductModel } from "./models/product";
import * as path from "path";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
class App {
    private app: express.Application;
    private port: number;
    private controllerLoader: ControllerLoader;

    constructor(port: number, @inject(delay(() => ControllerLoader)) controllerLoader?: ControllerLoader) {
        this.app = express();
        this.port = port;

        this.controllerLoader = controllerLoader;

        this.initialiseMiddleware();

        this.initialiseControllers();

        this.connectToMongo();

        this.app.set("views", path.join(__dirname, "views"));
    }


    private initialiseMiddleware() {
        this.app.use(express.json());
        this.app.use("/public", express.static("public"));
        this.app.set("view engine", "ejs");

        this.app.disable("x-powered-by");
    }

    private initialiseControllers() {
        this.controllerLoader.sadBoiImport().then((controllers) => {
            for (let controller of controllers) {
                this.app.use("/", controller.router);
            }
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`);
        });
    }

    private async connectToMongo() {
        await connect(process.env.MONGO_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, (err) => {
            if (err)
                console.log(err);
        });
    }
}

export default App;