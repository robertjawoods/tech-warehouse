import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/userRepository';
import { container } from '../IoC/inversify.config';
import { TypeSymbols } from '../IoC/types';

export async function authenticateRoute(request, res: Response, next) {
	if (request.user) {
		const repository: UserRepository = container.get<UserRepository>(TypeSymbols.UserRepository);

		request.user = await repository.getUser(request.user);
		next();
	} else {
		res.status(403).redirect('/');
	}
}
