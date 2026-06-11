import * as z from 'zod';

const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;

export const appSchema = z
	.object({
		LOG_LEVEL: z.enum(logLevels).optional(),
		NODE_ENV: z.string().optional(),
		PORT: z.int().optional().default(3000),
	})
	.transform((shape) => {
		const logLevel =
			shape.LOG_LEVEL ?? (shape.NODE_ENV === 'production' ? logLevels[2] : logLevels[0]);

		return { ...shape, LOG_LEVEL: logLevel };
	});
