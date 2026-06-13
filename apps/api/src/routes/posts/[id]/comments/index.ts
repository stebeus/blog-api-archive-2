import type { Handler } from 'express';

import { comments } from '#root/db/schema.ts';
import { db } from '#root/lib/drizzle.ts';
import { validate } from '#root/middleware/validation.ts';

import { schema } from './validations.ts';

export const get: Handler = async (req, res) => {
	const data = await db.query.comments.findMany({ where: { postId: Number(req.params.id) } });
	res.send({ data });
};

export const postFn: Handler = async (req, res) => {
	const {
		body: { author, content },
		params: { id },
	} = req.body;

	const data = await db
		.insert(comments)
		.values({ author, content, postId: Number(id) })
		.returning();

	res.send({ data });
};

export const post = [validate(schema), postFn];
