import type { Dictionaries } from './types'


const assembleMarketName = (outcomeId: string | number, dictionaries: Dictionaries) => {
  const { outcomes, markets, gamePeriods, gameTypes, teamPlayers } = dictionaries
  const { marketId, gamePeriodId, gameTypeId, teamPlayerId } = outcomes[outcomeId]

  const gamePeriod = gamePeriods[gamePeriodId] ? `${gamePeriods[gamePeriodId]} - ` : ''
  const teamPlayer = teamPlayers[teamPlayerId]
  const market = markets[marketId]
  const gameType = gameTypes[gameTypeId]

  const rightPart = [ teamPlayer, market, gameType ].filter(Boolean).join(' ')

  return `${gamePeriod}${rightPart}`
}

export default assembleMarketName
