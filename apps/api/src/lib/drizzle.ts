import { drizzle } from 'drizzle-orm/postgres-js';

import { config } from '#root/config.ts';
import { relations } from '#root/db/relations.ts';

export const db = drizzle({
	casing: 'snake_case',
	connection: config.DB_URL,
	relations,
});
