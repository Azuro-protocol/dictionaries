const fs = require('fs')
const path = require('path')
const { globSource } = require('ipfs-http-client')
const marketNames = require('../src/marketNames')
const marketDescriptions = require('../src/marketDescriptions')


const SOURCE_DIR = 'src'
const OUT_DIR = 'out'
const OUTPUT_MAP_DIR = 'maps'
const OUTPUT_ARR_DIR = 'arrays'
const OUTPUT_JS_DIR = 'js'

const writeFile = async (dir, filepath, content) => {
  if (!fs.existsSync(`${OUT_DIR}/${dir}`)) {
    await fs.promises.mkdir(`${OUT_DIR}/${dir}`)
  }

  const outputPath = path.join(OUT_DIR, dir, path.basename(filepath))

  if (typeof content !== 'string') {
    content = JSON.stringify(content, null, 2)
  }

  await fs.promises.writeFile(outputPath, content)
}

const convertOutcomesJSONToArray = (content) => {
  return Object.keys(content).map((key) => ({
    outcomeId: parseInt(key),
    ...content[key],
  }))
}

const convertJSONToArray = (content) => {
  return Object.keys(content).map((key) => ({
    id: parseInt(key),
    value: content[key],
  }))
}

const convertOutcomesJSONToJS = (content) => {
  let data = ''

  Object.keys(content).map((key) => {
    const { selectionId, marketId, gamePeriodId, gameTypeId, gameVarietyId, pointsId, teamPlayerId } = content[key]

    if (data) {
      data += ','
    }

    data += `${key}:[${selectionId},${marketId},${gamePeriodId},${gameTypeId},${gameVarietyId},${pointsId},${teamPlayerId}]`
  })

  return `var data = {${data}};

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

const convertJSONToJS = (content) => {
  const data = Object.keys(content).reduce((acc, key) => {
    acc[parseInt(key)] = content[key]
    return acc
  }, {})

  return `module.exports = ${JSON.stringify(data, null, 2)}`
}

const convert = async () => {
  if (!fs.existsSync(OUT_DIR)) {
    await fs.promises.mkdir(OUT_DIR)
  }

  for await (const file of globSource(SOURCE_DIR, '**/*.json')) {
    const filename = file.path.replace('/', '').replace('.json', '')
    const content = JSON.parse(await fs.promises.readFile(file.content.path, 'utf-8'))

    let map = content
    let array
    let js

    if (file.path.match('outcomes')) {
      js = convertOutcomesJSONToJS(content)
      array = convertOutcomesJSONToArray(content)
    }
    else {
      js = convertJSONToJS(content)
      array = convertJSONToArray(content)
    }

    await Promise.all([
      writeFile(OUTPUT_MAP_DIR, `${filename}.json`, map),
      writeFile(OUTPUT_ARR_DIR, `${filename}.json`, array),
      writeFile(OUTPUT_JS_DIR, `${filename}.js`, js),
    ])
  }

  await Promise.all([
    writeFile(OUTPUT_MAP_DIR, `marketNames.json`, marketNames),
    writeFile(OUTPUT_MAP_DIR, `marketDescriptions.json`, marketDescriptions),
    writeFile(OUTPUT_ARR_DIR, `marketNames.json`, convertJSONToArray(marketNames)),
    writeFile(OUTPUT_ARR_DIR, `marketDescriptions.json`, convertJSONToArray(marketDescriptions)),
    writeFile(OUTPUT_JS_DIR, `marketNames.js`, `module.exports = ${JSON.stringify(marketNames, null, 2)}`),
    writeFile(OUTPUT_JS_DIR, `marketDescriptions.js`, `module.exports = ${JSON.stringify(marketDescriptions, null, 2)}`),
  ])
}

convert()
