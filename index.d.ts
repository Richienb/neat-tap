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

	export interface Result {
		version?: number
		ok: boolean
		stats: {
			bailout: boolean
			todo: number
			skip: 0
			time?: number
			total: number
			passes: number
			failures: number
		}
		plan: {
			start: number
			end: number
			skipAll: boolean
			skipReason: string
			comment: string
		}
		assertions: {
			id: number
			comment?: string
			name?: string
			ok: boolean
			skipped: boolean
			skipReason?: string
			todo?: string
			time?: number
			extra?: unknown
		}[]
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
 * 	//=> { version: undefined, ok: false ... }
 * })();
 * ```
*/
declare function neatTap(data: string | Buffer | ReadableStream, options?: neatTap.Options): Promise<neatTap.Result>

export = neatTap
