import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { authenticateRoute } from '../../../core/authentication/authenticate';
import { TypeSymbols } from '../../../core/IoC/types';
import { Address } from '../../../models/address';
import { UserModel } from '../../../models/user';
import { AddressRepository } from '../../../repositories/addressRepository';
import { AddressService } from '../../../services/addressService';

@Controller('api/user')
@injectable()
export class UserController {
    private readonly addressService: AddressService;

    constructor(@inject(TypeSymbols.AddressService) addressService?: AddressService) {
        this.addressService = addressService;
    }

    @Post('addressbook')
    @Middleware(authenticateRoute)
    async addAddress(request, response: Response) {
        const user: UserModel = request.user;
        const address: Address = request.body;

        await this.addressService.addAddress(user.id, address);
    }

    @Get('addressbook')
    @Middleware(authenticateRoute)
    async getAddresses(request: Request, response: Response) {

    }
};