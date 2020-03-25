"use strict"

const TapParser = require("tap-parser")
const toReadableStream = require("to-readable-stream")
const { pipeline } = require("stream")

const parseTapStream = (data, options = {}) => new Promise((resolve, reject) => {
	const parser = new TapParser(options)

	let version
	const assertions = []
	let comment

	parser.on("version", (result) => {
		version = result
	})

	parser.on("comment", (result) => {
		comment = result
	})

	parser.on("assert", ({ id, name, ok, skip, todo, time, diag }) => {
		assertions.push({
			id,
			comment,
			name,
			ok,
			skipped: Boolean(skip),
			skipReason: skip === true ? undefined : skip,
			todo: todo === true ? undefined : todo,
			time,
			extra: diag,
		})
	})

	parser.on("complete", ({ count, pass, fail, ok, bailout, todo, skip, plan, time }) => {
		resolve({
			version,
			ok,
			stats: {
				bailout,
				todo,
				skip,
				time: time === null ? undefined : time,
				total: count,
				passes: pass,
				failures: fail,
			},
			plan: { ...plan },
			assertions,
		})
	})

	pipeline(data, parser, reject)
})

module.exports = async (data, options) => {
	options = {
		strict: true,
		...options,
	}

	if (typeof data === "string" || Buffer.isBuffer(data)) {
		data = toReadableStream(data)
	}

	return parseTapStream(data, options)
}
