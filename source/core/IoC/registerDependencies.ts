import { container, Lifecycle } from "tsyringe"
import Controller from "../controller"
import { IndexController } from "../../controllers/indexController";
import "reflect-metadata";

const registerControllers = () => {
    //  container.register<IndexController>(IndexController, { useClass: IndexController });
}

export const registerDependencies = () => {
    registerControllers();
};
