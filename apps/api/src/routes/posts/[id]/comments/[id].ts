import type { Handler } from 'express';

import { eq } from 'drizzle-orm';

import { comments } from '#root/db/schema.ts';
import { db } from '#root/lib/drizzle.ts';
import { validate } from '#root/middleware/validation.ts';

import { schema } from './validations.ts';

export const get: Handler = async (req, res) => {
	const data = await db.query.comments.findFirst({ where: { id: Number(req.params.id) } });
	res.send({ data });
};

export const patchFn: Handler = async (req, res) => {
	const {
		body: { author, content },
		params: { id },
	} = req;

	const data = await db
		.update(comments)
		.set({ author, content })
		.where(eq(comments.id, Number(id)))
		.returning();

	res.send({ data });
};

export const patch = [validate(schema), patchFn];

export const del: Handler = async (req, res) => {
	const data = await db
		.delete(comments)
		.where(eq(comments.id, Number(req.params.id)))
		.returning();

	res.send({ data });
};
