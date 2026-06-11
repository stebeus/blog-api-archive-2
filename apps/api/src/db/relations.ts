import { defineRelations } from 'drizzle-orm';

import * as schema from './schema.ts';

export const relations = defineRelations(schema, (r) => ({
	posts: {
		author: r.one.users({
			from: r.posts.authorId,
			to: r.users.id,
		}),
	},
	comments: {
		post: r.one.posts({
			from: r.comments.postId,
			to: r.posts.id,
		}),
	},
}));
