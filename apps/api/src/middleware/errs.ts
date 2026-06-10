import type { ErrorRequestHandler, Handler } from 'express';

import { constants } from 'node:http2';

import { HttpErr } from '#root/utils/errs.ts';

const { HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_NOT_FOUND } = constants;

export const handleNotFoundErr: Handler = (req, res, next) =>
	next(new HttpErr(HTTP_STATUS_NOT_FOUND));

export const handleErr: ErrorRequestHandler = (err, req, res, next) => {
	if (res.headersSent) return next(err);

	const isHttpErr = err instanceof HttpErr;
	const httpErr = isHttpErr ? err : new HttpErr(HTTP_STATUS_INTERNAL_SERVER_ERROR);

	const { status, message } = httpErr;

	req.log.error(err);

	res.status(status).send({ status, message });
};
