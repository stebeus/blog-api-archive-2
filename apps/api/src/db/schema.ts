import { boolean, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { id, timestamps, votes } from './mixins.ts';

export const users = pgTable('users', {
	id,
	name: text().notNull(),
	email: text().notNull().unique(),
	password: varchar({ length: 128 }).notNull(),
	isAdmin: boolean().default(false),
	...timestamps,
});

export const posts = pgTable('posts', {
	id,
	title: varchar({ length: 128 }).notNull(),
	content: text().notNull(),
	...votes,
	isPublic: boolean().notNull(),
	...timestamps,
	authorId: integer().references(() => users.id),
});

export const comments = pgTable('comments', {
	id,
	author: varchar({ length: 100 }),
	content: text().notNull(),
	...votes,
	...timestamps,
	postId: integer().references(() => posts.id),
});
