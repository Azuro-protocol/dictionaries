#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const { downloadDictionaries } = require('./utils')


const TMP_FOLDER = path.resolve(process.cwd(), '.tmp/dictionaries')

const getOutcomes = async (marketName) => {
  if (!fs.existsSync(TMP_FOLDER)) {
    fs.mkdirSync(TMP_FOLDER, { recursive: true })

    await downloadDictionaries({
      version: 'latest',
      filetype: 'js',
      outputPath: TMP_FOLDER,
    })
  }

  const keysArr = []
  const result = []

  const marketNames = require(path.join(TMP_FOLDER, 'marketNames.js'))

  Object.keys(marketNames).forEach((key) => {
    if (marketNames[key].toLowerCase() === marketName.toLowerCase()) {
      keysArr.push(key)
    }
  })

  const data = require(path.join(TMP_FOLDER, 'outcomes.js'))

  Object.keys(data).forEach((outcomeId) => {
    const { selectionId, marketId, gamePeriodId, gameTypeId, gameVarietyId, pointsId, teamPlayerId } = data[outcomeId]

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
