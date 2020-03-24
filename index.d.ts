declare namespace neatTap {
	export interface Options {
		/**
		 * Whether to fail when provided with non-TAP data.
		 * @default true
		*/
		strict?: boolean

		/**
		 * Whether to stop parsing when a bail line is hit.
		 * @default false
		*/
		bail?: boolean

		/**
		 * Ignore TAP version lines.
		 * @default false
		*/
		omitVersion?: boolean
	}

	export interface Assertion {
		ok: boolean
		id: number
		name: string
		fullname: string
	}

	export interface Result {
		ok: boolean
		count: number
		pass: number
		fail: number
		bailout: boolean
		todo: number
		skip: number
		plan: {
			start: number
			end: number
			skipAll: boolean
			skipReason: string
			comment: string
		}
		failures: (Assertion & { ok: false })[]
		time: null | number
		passes: (Assertion & { ok: true })[]
		assertions: Assertion[]
	}
}

/**
 * Fast and simple TAP parser.
 * @param data The TAP data to parse.
 * @example
 * ```
 * const neatTap = require("neat-tap");
 *
 * const tapData = `
 * 1..4
 * ok 1 - A
 * not ok 2 - B
 * ok 3 - C
 * not ok 4 - D
 * `;
 *
 * (async () => {
 * 	await neatTap(tapData);
 * 	//=> { ok: false, count: 4, pass: 2, ... }
 * })();
 * ```
*/
declare function neatTap(data: string | Buffer | ReadableStream, options?: neatTap.Options): Promise<neatTap.Result>

export = neatTap
