import config from 'config';

import Debug from 'debug';
const debug = Debug('api:routes');

import express from 'express';
const router = express.Router();

import jwt from 'jsonwebtoken';
import passport from 'passport';
import '../../lib/auth';

router.post('/', async (req, res, next) => {
	passport.authenticate('signin', async (err, user, info) => {
		try {
			if (err || !user) return next(new Error('An error occurred.'));

			req.login(user, { session: false  }, async (error) => {
				if (error) return next(error);

				const body = { 
					email: user.email, 
					permission: user.permission,
					verified: user.verified
				};
				// TODO: seperate jwt.sign to another file
				const token = jwt.sign({ user: body }, config.get('jwt.secret'));

				return res.json({ token });
			});
		} catch (e) {
			return next(e);
		}
	})(req, res, next);
});

export default router;
