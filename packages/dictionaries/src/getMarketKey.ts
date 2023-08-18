import dictionaries from './dictionaries'
import { MARKET_IDS___DONT_GROUP_MARKETS_BY_TEAM_PLAYER_ID } from './constants'


const getMarketKey = (outcomeId: string | number): string => {
  const outcome = dictionaries.outcomes[outcomeId]

  if (!outcome) {
    throw new Error(`Outcome with outcomeId:${outcomeId} not found in dictionaries. Please try update @azuro-org/dictionaries package to the latest version or contact Azuro team for support.`)
  }

  const { marketId, gamePeriodId, gameTypeId, teamPlayerId } = outcome

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
