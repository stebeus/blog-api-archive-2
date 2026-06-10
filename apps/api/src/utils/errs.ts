import { STATUS_CODES } from 'node:http';
import { constants } from 'node:http2';

const { HTTP_STATUS_BAD_REQUEST } = constants;

export class HttpErr extends Error {
	readonly status: number;

	constructor(status = HTTP_STATUS_BAD_REQUEST, message = STATUS_CODES[status]) {
		super(message);
		this.status = status;
	}
}

export const isErrnoException = (err: unknown): err is NodeJS.ErrnoException =>
	err instanceof Error;
