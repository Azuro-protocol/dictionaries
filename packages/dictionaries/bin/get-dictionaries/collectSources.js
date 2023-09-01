const fs = require('fs')
const path = require('path')
const glob = require('fast-glob')
const { SRC_DIR } = require('./constants')


module.exports = async function collectSources() {
  const sources = {
    marketNames: require(path.resolve(SRC_DIR, 'marketNames')),
    marketDescriptions: require(path.resolve(SRC_DIR, 'marketDescriptions')),
    marketOrders: require(path.resolve(SRC_DIR, 'marketOrders')),
  }

  const filePaths = await glob(`${SRC_DIR}/**/*.json`)

  for await (const filePath of filePaths) {
    const filename = filePath.replace(/.+\//, '').replace('.json', '')

    sources[filename] = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'))
  }

  return sources
}
