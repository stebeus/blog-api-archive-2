import { Passport } from 'passport';
import { Strategy, type VerifyFunction } from 'passport-local';

import { compare } from '#root/utils/auth.ts';

import { db } from './drizzle.ts';

export const auth = new Passport();

const verify: VerifyFunction = async (email, password, done) => {
	try {
		const user = await db.query.users.findFirst({ where: { email } });

		if (user == null) {
			return done(null, false, { message: 'Incorrect email' });
		}

		const isMatch = await compare(password, user.password);

		if (!isMatch) {
			return done(null, false, { message: 'Incorrect password' });
		}

		return done(null, user);
	} catch (error) {
		return done(error);
	}
};

const localStrategy = new Strategy({ usernameField: 'email' }, verify);

auth.use(localStrategy);

auth.serializeUser((user, done) => done(null));

auth.deserializeUser(async (id: number, done) => {
	try {
		const user = await db.query.users.findFirst({ where: { id } });
		done(null, user);
	} catch (error) {
		done(error);
	}
});
