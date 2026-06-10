import { pinoHttp } from 'pino-http';

import { config } from '#root/config/index.ts';

export const pino = pinoHttp({
	level: config.LOG_LEVEL,
	transport: {
		target: 'pino-pretty',
	},
});

export const { logger } = pino;
