import { env, loadEnvFile } from 'node:process';

import * as z from 'zod';

import { isErrnoException } from '#root/utils/errs.ts';

import { appSchema } from './app.ts';
import { dbSchema } from './db.ts';

try {
	loadEnvFile();
} catch (err) {
	if (isErrnoException(err) && err.code !== 'ENOENT') throw err;
}

const schema = z.intersection(appSchema, dbSchema);
const { data, error, success } = z.safeParse(schema, env);

if (!success) throw new Error(z.prettifyError(error));

export const config = data;
