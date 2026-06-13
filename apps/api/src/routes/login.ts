import type { Handler } from 'express';

import { users } from '#root/db/schema.ts';
import { db } from '#root/lib/drizzle.ts';
import { validate } from '#root/middleware/validation.ts';
import { hash } from '#root/utils/auth.ts';

const getFn: Handler = async (req, res) => {
	const { name, email, password } = req.body;

	const hashedPassword = await hash(password);
	const data = await db.insert(users).values({ name, email, password: hashedPassword }).returning();

	res.send({ data });
};

export const get = [getFn];
