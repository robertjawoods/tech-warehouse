import * as express from "express";

class Controller {
    public path: string;
    public router: express.Router = express.Router();
}

export default Controller;