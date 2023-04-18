const fs = require('fs')
const collectSources = require('./collectSources')
const transform = require('./transform')
const createIndexFile = require('./createIndexFile')
const { OUT_DIR } = require('./constants')


const init = async () => {
  if (!fs.existsSync(OUT_DIR)) {
    await fs.promises.mkdir(OUT_DIR)
  }

  const sources = await collectSources()

  await transform(sources)
  await createIndexFile(sources)
}

init()
