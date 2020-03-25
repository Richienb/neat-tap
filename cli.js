#!/usr/bin/env node
const neatTap = require(".")

neatTap(process.stdin).then(console.log)
