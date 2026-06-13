import type { Handler } from 'express';

import { eq } from 'drizzle-orm';

import { posts } from '#root/db/schema.ts';
import { db } from '#root/lib/drizzle.ts';
import { validate } from '#root/middleware/validation.ts';
import { schema } from '#root/routes/posts/validations.ts';

export const get: Handler = async (req, res) => {
	const data = await db.query.posts.findFirst({ where: { id: Number(req.params.id) } });
	res.send({ data });
};

const patchFn: Handler = async (req, res) => {
	const {
		body: { title, content, isPublic },
		params: { id },
	} = req;

	const data = await db
		.update(posts)
		.set({ title, content, isPublic })
		.where(eq(posts.id, Number(id)))
		.returning();

	res.send({ data });
};

export const patch = [validate(schema), patchFn];

export const del: Handler = async (req, res) => {
	const data = await db
		.delete(posts)
		.where(eq(posts.id, Number(req.params.id)))
		.returning();

	res.send({ data });
};
