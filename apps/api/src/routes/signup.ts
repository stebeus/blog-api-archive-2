import type { Handler } from 'express';

import * as z from 'zod';

import { users } from '#root/db/schema.ts';
import { db } from '#root/lib/drizzle.ts';
import { validate } from '#root/middleware/validation.ts';
import { hash } from '#root/utils/auth.ts';

const schema = z.object({
	name: z.string().min(1, 'Field is required'),
	email: z.email('Invalid email').min(1, 'Field is required'),
	password: z.string().min(8, 'Must be at least 8 characters long'),
});

const postFn: Handler = async (req, res) => {
	const { name, email, password } = req.body;

	const hashedPassword = await hash(password);
	const data = await db.insert(users).values({ name, email, password: hashedPassword }).returning();

	res.send({ data });
};

export const post = [validate(schema), postFn];
