import { STATUS_CODES } from 'node:http';
import { constants } from 'node:http2';

const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export class HttpError extends Error {
	readonly status: number;

	constructor(status = HTTP_STATUS_INTERNAL_SERVER_ERROR, message = STATUS_CODES[status]) {
		super(message);
		this.status = status;
	}
}

export const isErrnoException = (error: unknown): error is NodeJS.ErrnoException =>
	error instanceof Error;

export const isHttpError = (error: Error) => error instanceof HttpError;
