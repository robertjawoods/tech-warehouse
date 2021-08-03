import { Request, response, Response } from 'express';
import { Controller, Get, Middleware } from '@overnightjs/core';
import * as passport from 'passport';
import { authenticateRoute } from '../../core/authentication/authenticate';
import { BaseModel } from '../../models/baseModel';
import { UserModel } from '../../models/user';
import { AddressService } from '../../services/addressService';
import { inject, injectable } from 'inversify';
import { TypeSymbols } from '../../core/IoC/types';
import { Address } from '../../models/address';
import { IAuthenticatedRequest } from '../../core/IAuthenticatedRequest';
import { lazyInject } from '../../core/IoC/inversify.config';

@injectable()
@Controller('user')
export class UserController {
	@lazyInject(TypeSymbols.AddressService)
	private readonly addressService: AddressService;

	@Get('login')
	@Middleware(passport.authenticate('google', { scope: ['profile', 'email'] }))
	async login(_: Request, response: Response) {
		const model = await new BaseModel().setData();
		response.render('user/login', { model });
	}

	@Get()
	@Middleware(authenticateRoute)
	async index(request: IAuthenticatedRequest, response: Response) {
		const model = await new BaseModel<UserModel>().setData(request.user);

		response.render('user/index', { model });
	}

	@Get('register')
	async register(_: Request, response: Response) {
		const model = await new BaseModel().setData();
		response.render('user/register', { model });
	}

	@Get('authenticated')
	@Middleware(passport.authenticate('google', { successRedirect: '/user', failedRedirect: '/' }))
	async authenticated(request, response: Response) { }

	@Get('addressbook')
	@Middleware(authenticateRoute)
	async addressbook(request: IAuthenticatedRequest, response: Response) {
		let addresses: Address[] = await this.addressService.getAddressesForUser(request.user.id);

		const model = await new BaseModel().setData({ addresses: addresses });
		response.render('user/addressbook', { model });
	}

	@Get('wishlist')
	async wishlist(request: IAuthenticatedRequest, response) {
		const model = await new BaseModel().setData();

		response.render('user/wishlist', { model });
	}

	@Get('basket')
	async basket(request: IAuthenticatedRequest, response: Response) {
		const model = await new BaseModel().setData();

		response.render('user/basket', { model });
	}
}
