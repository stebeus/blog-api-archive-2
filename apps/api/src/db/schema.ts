import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { id, timestamps } from './mixins.ts';

export const users = pgTable('users', {
	id,
	name: text().notNull(),
	email: text().notNull().unique(),
	password: varchar({ length: 128 }).notNull(),
	...timestamps,
});
