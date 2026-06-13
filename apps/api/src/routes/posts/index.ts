import type { Handler } from 'express';

import { posts } from '#root/db/schema.ts';
import { db } from '#root/lib/drizzle.ts';
import { validate } from '#root/middleware/validation.ts';

import { schema } from './validations.ts';

export const get: Handler = async (req, res) => {
	const data = await db.query.posts.findMany();
	res.send({ data });
};

export const postFn: Handler = async (req, res) => {
	const { title, content, isPublic } = req.body;
	const data = await db.insert(posts).values({ title, content, isPublic, authorId: 2 }).returning();
	res.send({ data });
};

export const post = [validate(schema), postFn];
