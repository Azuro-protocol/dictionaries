#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2))
const { downloadDictionaries } = require('./utils')


downloadDictionaries({
  version: argv.version || argv.v,
  filetype: argv.type || argv.t,
  outputPath: argv.output || argv.o,
})
