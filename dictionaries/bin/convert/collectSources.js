const fs = require('fs')
const path = require('path')
const { globSource } = require('ipfs-http-client')

const { SOURCE_DIR } = require('./constants')
const marketNames = require('../../src/marketNames')
const marketDescriptions = require('../../src/marketDescriptions')


module.exports = async () => {
  const sources = {
    marketNames,
    marketDescriptions,
  }

  for await (const file of globSource(SOURCE_DIR, '**/*.json')) {
    const filename = file.path.replace('/', '').replace('.json', '')
    const content = JSON.parse(await fs.promises.readFile(file.content.path, 'utf-8'))

    sources[filename] = content
  }

  return sources
}
