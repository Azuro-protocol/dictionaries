import { MARKET_IDS___DONT_GROUP_MARKETS_BY_TEAM_PLAYER_ID } from './constants'
import type { Dictionaries } from './types'


const getMarketKey = (outcomeId: string | number, dictionaries: Dictionaries) => {
  const { marketId, gamePeriodId, gameTypeId, teamPlayerId } = dictionaries.outcomes[outcomeId]

  // ATTN very important to not change the order of params in the literal!
  //  same logic used for static keys in helpers/conditions/marketRegistry.ts
  let marketKeys = [ marketId, gamePeriodId, gameTypeId ]

  if (
    teamPlayerId
    && !MARKET_IDS___DONT_GROUP_MARKETS_BY_TEAM_PLAYER_ID.includes(marketId)
  ) {
    marketKeys.push(teamPlayerId)
  }

  return marketKeys.join('-')
}

export default getMarketKey
