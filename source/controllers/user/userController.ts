import { Request, response, Response } from 'express';
import { Controller, Get, Middleware } from '@overnightjs/core';
import * as passport from 'passport';
import { authenticateRoute } from '../../core/authentication/authenticate';
import { BaseModel } from '../../models/baseModel';
import { UserModel } from '../../models/user';

@Controller('user')
export class UserController {
	@Get('login')
	@Middleware(passport.authenticate('google', { scope: ['profile', 'email'] }))
	async login(_: Request, response: Response) {
		const model = await new BaseModel().setData();
		response.render('user/login', { model });
	}

	@Get()
	@Middleware(authenticateRoute)
	async index(request: any, response: Response) {
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
	async authenticated(request, response: Response) {}

	@Get('addressbook')
	@Middleware(authenticateRoute)
	async addressbook(request, response: Response) {
		const model = await new BaseModel().setData();
		response.render('user/addressbook', { model });
	}
}
