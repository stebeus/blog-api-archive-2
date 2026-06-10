import { defineConfig } from 'drizzle-kit';

import { config } from './src/config/index.ts';

export default defineConfig({
	casing: 'snake_case',
	dialect: 'postgresql',
	schema: './src/db/schema.ts',
	dbCredentials: {
		url: config.DB_URL,
	},
});
