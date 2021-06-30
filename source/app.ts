import * as express from "express";
import { connect } from "mongoose";
// import { container, injectable } from "tsyringe";
import Controller from "./controllers/controller";
import { registerDependencies } from "./core/IoC/registerDependencies";
import { ProductModel } from "./models/product";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

class App {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
    }

    public init() {
        registerDependencies();

        this.initialiseMiddleware();

        // var controllers: Controller[] = container.resolveAll(Controller);
        // console.log(controllers);

        // this.initialiseControllers(controllers);

        this.connectToMongo();
    }

    private initialiseMiddleware() {
        this.app.use(express.json());
        this.app.use("/public", express.static("public"));
        this.app.set("view engine", "ejs");
    }

    private initialiseControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use("/", controller.router);
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

        //this.addTestProduct();
    }

    private async addTestProduct() {
        await ProductModel.deleteMany({});
    }
}

export default App;