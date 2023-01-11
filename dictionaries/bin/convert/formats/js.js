const { OUTPUT_JS_DIR } = require('../constants')
const writeFile = require('../writeFile')


const convertOutcomes = (content) => {
  let data = ''

  Object.keys(content).map((key) => {
    const { selectionId, marketId, gamePeriodId, gameTypeId, gameVarietyId, pointsId, teamPlayerId } = content[key]

    if (data) {
      data += ','
    }

    data += `${key}:[${selectionId},${marketId},${gamePeriodId},${gameTypeId},${gameVarietyId},${pointsId},${teamPlayerId}]`
  })

  return `const data = {${data}};

export default Object.keys(data).reduce((acc, key) => {
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

const convertOthers = (content) => {
  return `export default ${JSON.stringify(content, null, 2)}`
}

module.exports = async (sources) => {
  for (let filename in sources) {
    let content = sources[filename]

    if (filename === 'outcomes') {
      content = convertOutcomes(content)
    }
    else {
      content = convertOthers(content)
    }

    await writeFile(OUTPUT_JS_DIR, filename, 'js', content)
  }
}
