import * as v from 'valibot';

const pgConnection = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

export const dbSchema = v.object({
	DB_URL: v.pipe(v.string(), v.url(), v.regex(pgConnection)),
});
