import { integer, timestamp } from 'drizzle-orm/pg-core';

export const id = integer().primaryKey().generatedAlwaysAsIdentity();

export const timestamps = {
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().$onUpdate(() => new Date()),
};

export const votes = {
	likes: integer().default(0),
	dislikes: integer().default(0),
};
