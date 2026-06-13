import type { Handler } from 'express';

import { constants } from 'node:http2';

import * as z from 'zod';

const { HTTP_STATUS_BAD_REQUEST } = constants;

export const validate =
	(schema: z.ZodObject): Handler =>
	(req, res, next) => {
		const { data, error, success } = schema.safeParse(req.body);

		if (!success) return res.status(HTTP_STATUS_BAD_REQUEST).send({ error: z.flattenError(error) });

		req.body = data;
		next();
	};
