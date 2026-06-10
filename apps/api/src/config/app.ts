import * as v from 'valibot';

const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

export const appSchema = v.pipe(
	v.object({
		LOG_LEVEL: v.optional(v.picklist(logLevels), 'info'),
		NODE_ENV: v.optional(v.string()),
		PORT: v.optional(v.number(), 3000),
	}),
	v.transform((input) => ({
		...input,
		LOG_LEVEL: input.NODE_ENV === 'production' ? logLevels[2] : logLevels[0],
	})),
);
