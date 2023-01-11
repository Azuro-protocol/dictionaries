const fs = require('fs')

const { OUT_DIRS } = require('./constants')
const toTS = require('./formats/ts')
const toJS = require('./formats/js')
const toJSONMaps = require('./formats/json/maps')
const toJSONArrays = require('./formats/json/arrays')
const collectSources = require('./collectSources')


const convert = async () => {
  const sources = await collectSources()

  await Promise.all([
    toTS(sources),
    toJS(sources),
    toJSONMaps(sources),
    toJSONArrays(sources),
  ])
}

const createFolders = async () => {
  for await (const dir of OUT_DIRS) {
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir)
    }
  }
}

const init = async () => {
  await createFolders()
  await convert()
}

init()
