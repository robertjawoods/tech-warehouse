import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('api/register')
export class RegistrationController {

    @Post()
    index(request: Request, response: Response) {
        console.log(request.body);
    }
};