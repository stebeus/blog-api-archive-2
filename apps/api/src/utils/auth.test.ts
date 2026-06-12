import { equal } from 'node:assert/strict';
import { describe, it } from 'node:test';

import { hash, verify } from './auth.ts';

describe('verify', () => {
	it('confirms if the password mismatches the hash', async () => {
		// Arrange
		const passwordHash = await hash('Hello, world!');

		// Act
		const isMatch = await verify('Goodbye, world!', passwordHash);

		// Assert
		equal(isMatch, false);
	});

	it('confirms if the password matches the hash', async () => {
		// Arrange
		const passwordHash = await hash('Hello, world!');

		// Act
		const isMatch = await verify('Hello, world!', passwordHash);

		// Assert
		equal(isMatch, true);
	});
});
