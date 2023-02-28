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

  return `type Data = Record<string, [ number, number, number, number, number, null | number, null | number ]>

const data: Data = {${data}};
  
export type Outcomes = Record<string, {
  selectionId: number
  marketId: number
  gamePeriodId: number
  gameTypeId: number
  gameVarietyId: number
  pointsId: number | null
  teamPlayerId: number | null
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
}, {} as Outcomes)
`
}

const convertSports = (content) => {
  return `const sports = ${content} as const

  export type SportTypeId = keyof typeof sports
  export type SportSlug = typeof sports[SportTypeId]['slug']
  
  export const sportIdBySlug = Object.entries(sports).reduce((acc, [ id, { slug } ]) => {
    acc[slug] = +id
  
    return acc
  }, {} as Record<SportSlug, number>)
  
  export default sports
  `
}

const convertOthers = (content) => {
  return `export default ${JSON.stringify(content, null, 2)} as Record<string, string>`
}

module.exports = async (sources) => {
  for (let filename in sources) {
    let content = sources[filename]

    switch (filename) {
      case 'sports':
        content = convertSports(content)
        break;

      case 'outcomes':
        content = convertOutcomes(content)
        break;
    
      default:
        content = convertOthers(content)
    }

    await writeFile(OUTPUT_TS_DIR, filename, 'ts', content)
  }
}
