import getMarketKey from './getMarketKey'
import type { OnlyOne, Dictionaries } from './types'


type Props = {
  dictionaries: Dictionaries
} & OnlyOne<{
  marketKey: string
  outcomeId: string | number
}>

const getMarketName = (props: Props): string => {
  const { marketNames, markets, gamePeriods, gameTypes, teamPlayers } = props.dictionaries

  let marketKey

  if (props.outcomeId) {
    marketKey = getMarketKey({
      outcomeId: props.outcomeId,
      dictionaries: props.dictionaries,
    })
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
