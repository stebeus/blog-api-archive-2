import * as z from 'zod';

const pgConnection = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

export const dbSchema = z.object({
	DB_URL: z.url().regex(pgConnection),
});
