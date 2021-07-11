import { Request, Response } from 'express';
import { authenticate } from "../../core/authentication/authenticate";
import { Controller, Get } from '@overnightjs/core';
import { BaseModel } from '../../models/baseModel';

@Controller('user')
export class UserController {

    @Get('login')
    async login(_: Request, response: Response) {
        const model = await new BaseModel().setData();
        response.render('user/login', { model });
    };

    @Get()
    async index(_: Request, response: Response) {
        const model = await new BaseModel().setData();

        response.render('user/index', { model });
    }

    @Get('register')
    async register(_: Request, response: Response) {
        const model = await new BaseModel().setData();
        response.render('user/register', { model });
    }

}