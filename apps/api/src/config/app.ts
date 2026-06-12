import * as z from 'zod';

export const appSchema = z.object({
	PORT: z.int().optional().default(3000),
});
