import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const KEYLEN = 64;

const scryptPromise = promisify(scrypt);

export const hash = async (pwd: string) => {
	const salt = randomBytes(16).toHex();
	const derivedKey = await scryptPromise(pwd, salt, KEYLEN);
	return `${salt}:${(derivedKey as Buffer).toHex()}`;
};

export const verify = async (pwd: string, hash: string) => {
	const [salt, key] = hash.split(':');

	const buffer = Buffer.from(key, 'hex');
	const derivedKey = await scryptPromise(pwd, salt, KEYLEN);

	return timingSafeEqual(buffer, derivedKey as Buffer);
};
