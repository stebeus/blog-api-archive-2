import * as z from 'zod';

import { posts } from '#root/db/schema.ts';

const { title } = posts;

export const schema = z.object({
	title: z
		.string()
		.min(1, 'Field is required')
		.max(Number(title.length), `Must not have more than ${title.length} characters`),
	content: z.string().min(1, 'This field is required'),
	isPublic: z.stringbool(),
});
