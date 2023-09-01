const fs = require('fs')
const path = require('path')
const { OUT_DIR } = require('./constants')


function convertOutcomes(content) {
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
  
type Outcomes = Record<string, {
  selectionId: number
  marketId: number
  gamePeriodId: number
  gameTypeId: number
  gameVarietyId: number
  pointsId: number | null
  teamPlayerId: number | null
}>

export default new Proxy<Data>(data, {
  get(target, prop: string) {
    if (!target[prop]) {
      return undefined
    }

    const [ selectionId, marketId, gamePeriodId, gameTypeId, gameVarietyId, pointsId, teamPlayerId ] = target[prop]

    return {
      selectionId,
      marketId,
      gamePeriodId,
      gameTypeId,
      gameVarietyId,
      pointsId: pointsId || null,
      teamPlayerId: teamPlayerId || null
    }
  }
}) as unknown as Outcomes
`
}

function convertMarketOrders(content) {
  return `export default ${JSON.stringify(content, null, 2)} as Record<string, string[]>`
}

function convertOthers(content) {
  return `export default ${JSON.stringify(content, null, 2)} as Record<string, string>`
}

module.exports = async function transform(sources) {
  for (let filename in sources) {
    let content = sources[filename]

    if (filename === 'outcomes') {
      content = convertOutcomes(content)
    }
    else if (filename === 'marketOrders') {
      content = convertMarketOrders(content)
    }
    else {
      content = convertOthers(content)
    }

    await fs.promises.writeFile(path.resolve(OUT_DIR, `${filename}.ts`), content)
  }
}
