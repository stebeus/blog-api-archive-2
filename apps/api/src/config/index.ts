import { env, loadEnvFile } from 'node:process';

import * as v from 'valibot';

import { isErrnoException } from '#root/utils/errs.ts';

import { appSchema } from './app.ts';
import { dbSchema } from './db.ts';

try {
	loadEnvFile();
} catch (err) {
	if (isErrnoException(err) && err.code !== 'ENOENT') throw err;
}

const schema = v.intersect([appSchema, dbSchema]);
const { success, issues, output } = v.safeParse(schema, env);

if (!success) throw new Error(v.summarize(issues));

export const config = output;
