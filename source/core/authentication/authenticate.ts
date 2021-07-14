import { Request, Response } from "express";
import { UserRepository } from "../../repositories/userRepository";
import { container } from "../IoC/inversify.config";
import { TypeSymbols } from "../IoC/types";


export async function authenticateRoute(req, res: Response, next) {
    if (req.user) {
        let repository: UserRepository = container.get<UserRepository>(TypeSymbols.UserRepository);

        req.user = await repository.getUser(req.user);
        next();
    }
    else {
        res.status(403).redirect('/');
    }
}