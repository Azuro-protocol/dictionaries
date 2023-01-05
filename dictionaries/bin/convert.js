const fs = require('fs')
const path = require('path')
const { globSource } = require('ipfs-http-client')


const SOURCE_DIR = './maps'
const OUTPUT_ARR_DIR = 'arrays'
const OUTPUT_JS_DIR = 'js'

const writeFile = async (dir, filepath, content) => {
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir)
  }

  const outputPath = path.join(dir, path.basename(filepath))

  await fs.promises.writeFile(outputPath, content)
}

const convertToArray = (filepath, content) => {
  let modifiedContent

  if (filepath.match('outcomes')) {
    modifiedContent = Object.keys(content).map((key) => ({
      outcomeId: parseInt(key),
      ...content[key],
    }))
  }
  else {
    modifiedContent = Object.keys(content).map((key) => ({
      id: parseInt(key),
      value: content[key],
    }))
  }

  modifiedContent = Buffer.from(JSON.stringify(modifiedContent, null, 2))

  return writeFile(OUTPUT_ARR_DIR, filepath, modifiedContent)
}

const convertToJS = (filepath, content) => {
  let modifiedContent

  if (filepath.match('outcomes')) {
    let data = ''

    modifiedContent = Object.keys(content).map((key) => {
      const { selectionId, marketId, gamePeriodId, gameTypeId, gameVarietyId, pointsId, teamPlayerId } = content[key]

      if (data) {
        data += ','
      }

      data += `${key}:[${selectionId},${marketId},${gamePeriodId},${gameTypeId},${gameVarietyId},${pointsId},${teamPlayerId}]`
    })

    modifiedContent = `var data = {${data}};

module.exports = Object.keys(data).reduce((acc, key) => {
  const [ selectionId, marketId, gamePeriodId, gameTypeId, gameVarietyId, pointsId, teamPlayerId ] = data[key]
  
  acc[key] = {
    selectionId,
    marketId,
    gamePeriodId,
    gameTypeId,
    gameVarietyId,
    pointsId,
    teamPlayerId,
  }
  
  return acc
}, {})
`
  }
  else {
    const data = Object.keys(content).reduce((acc, key) => {
      acc[parseInt(key)] = content[key]
      return acc
    }, {})

    modifiedContent = `module.exports = ${JSON.stringify(data, null, 2)}`
  }

  return writeFile(OUTPUT_JS_DIR, filepath.replace(/\.json/, '.js'), modifiedContent)
}

const convert = async () => {
  for await (const file of globSource(SOURCE_DIR, '**/*.json')) {
    const content = JSON.parse(await fs.promises.readFile(file.content.path, 'utf-8'))

    await Promise.all([
      convertToArray(file.path, content),
      convertToJS(file.path, content),
    ])
  }
}

convert()
