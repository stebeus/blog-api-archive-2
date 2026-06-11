import { integer, timestamp } from 'drizzle-orm/pg-core';

export const id = integer().primaryKey().generatedAlwaysAsIdentity();

export const timestamps = {
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().$onUpdate(() => new Date()),
};
