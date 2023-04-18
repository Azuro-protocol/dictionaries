import dictionaries from './dictionaries'
import getMarketKey from './getMarketKey'
import type { OneOf } from './types'


type Props = OneOf<{
  marketKey: string
  outcomeId: string | number
}>

const getMarketName = (props: Props): string => {
  const { marketNames, markets, gamePeriods, gameTypes, teamPlayers } = dictionaries

  let marketKey

  if (props.outcomeId) {
    marketKey = getMarketKey(props.outcomeId)
  }
  else {
    marketKey = props.marketKey!
  }

  if (marketNames[marketKey]) {
    return marketNames[marketKey]
  }

  const [ marketId, gamePeriodId, gameTypeId, teamPlayerId ] = marketKey.split('-')

  const gamePeriod = gamePeriods[gamePeriodId] ? `${gamePeriods[gamePeriodId]} - ` : ''
  const teamPlayer = teamPlayers[teamPlayerId]
  const market = markets[marketId]
  const gameType = gameTypes[gameTypeId]

  const rightPart = [ teamPlayer, market, gameType ].filter(Boolean).join(' ')

  return `${gamePeriod}${rightPart}`
}

export default getMarketName
