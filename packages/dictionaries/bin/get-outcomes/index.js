#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2))
const { dictionaries } = require('../../lib')


const getOutcomes = async (marketName) => {
  const keysArr = []
  const result = []

  Object.keys(dictionaries.marketNames).forEach((key) => {
    if (dictionaries.marketNames[key].toLowerCase() === marketName.toLowerCase()) {
      keysArr.push(key)
    }
  })

  Object.keys(dictionaries.outcomes).forEach((outcomeId) => {
    const { selectionId, marketId, gamePeriodId, gameTypeId, gameVarietyId, pointsId, teamPlayerId } = dictionaries.outcomes[outcomeId]

    keysArr.forEach((marketKey) => {
      const dataMarketKey = `${marketId}-${gamePeriodId}-${gameTypeId}${teamPlayerId ? `-${teamPlayerId}` : ''}`

      if (dataMarketKey === marketKey) {
        result.push(outcomeId)
      }
    })
  })

  console.log(result)
}

getOutcomes(argv.m || argv.market)
