import * as z from 'zod';

import { comments } from '#root/db/schema.ts';

const { author } = comments;

export const schema = z.object({
	author: z
		.string()
		.min(1, 'Field is required')
		.max(Number(author.length), `Name cannot be longer than ${author.length} characters`),
	content: z.string().min(1, 'Field is required'),
});
