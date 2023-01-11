const { OUTPUT_TS_DIR } = require('../constants')
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
  
export type Outcomes = Record<string, {
  selectionId: number
  marketId: number
  gamePeriodId: number
  gameTypeId: number
  gameVarietyId: number
  pointsId: number
  teamPlayerId: number
}>

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
}, {}) as Outcomes
`
}

const convertOthers = (content) => {
  return `export default ${JSON.stringify(content, null, 2)} as Record<string, string>`
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

    await writeFile(OUTPUT_TS_DIR, filename, 'ts', content)
  }
}
