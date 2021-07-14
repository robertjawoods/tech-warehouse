import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import Pool from '../data/pool';

import { container } from '../IoC/inversify.config';
import { UserModel } from '../../models/user';
import { UserRepository } from '../../repositories/userRepository';
import { TypeSymbols } from '../IoC/types';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const googleStrategy = new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/user/authenticated'
}, async (accessToken, refreshToken, profile, done) => {
	const userRepository: UserRepository = container.get(TypeSymbols.UserRepository);

	const user: UserModel = await userRepository.getUser(profile.id);

	if (user) {
		done(null, user);
	} else {
		done(new Error('Could not find user'), null);
	}
});

export { googleStrategy };
