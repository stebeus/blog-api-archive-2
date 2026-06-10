import { join } from 'node:path';

import { router } from 'express-file-routing';

const { dirname } = import.meta;

export const apiRouter = await router({
	directory: join(dirname, '../routes'),
});
