"use strict"

const TapParser = require("tap-parser")
const toReadableStream = require("to-readable-stream")
const stripInstance = require("strip-instance")
const { pipeline } = require("stream")

const parseTapStream = (data, options = {}) => new Promise((resolve, reject) => {
	const parser = new TapParser(options, (result) => {
		result.assertions = [...result.passes, ...result.failures].sort((a, b) => a.id - b.id)

		resolve(stripInstance(result))
	})

	pipeline(data, parser, reject)
})

module.exports = async (data, options) => {
	options = {
		passes: true,
		strict: true,
		...options,
	}

	if (typeof data === "string" || Buffer.isBuffer(data)) {
		data = toReadableStream(data)
	}

	return parseTapStream(data, options)
}
