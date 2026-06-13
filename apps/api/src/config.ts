import { env, loadEnvFile } from 'node:process';

import * as z from 'zod';

import { isErrnoException } from '#root/utils/errors.ts';

try {
	loadEnvFile();
} catch (error) {
	if (isErrnoException(error) && error.code !== 'ENOENT') throw error;
}

const pgConnection = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

const schema = z.object({
	DB_URL: z.url().regex(pgConnection),
	JWT_SECRET: z.string(),
	PORT: z.int().optional().default(3000),
});

const { data, error, success } = z.safeParse(schema, env);

if (!success) throw new Error(z.prettifyError(error));

export const config = data;
