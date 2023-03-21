import { MARKET_IDS___USE_TEAM_PLAYER_INSTEAD_OUTCOME } from './constants'
import type { Dictionaries } from './types'


export type Params = {
  withPoint?: boolean
}

const assembleSelectionName = (outcomeId: string | number, dictionaries: Dictionaries, params?: Params): string => {
  const { outcomes, selections, teamPlayers, points } = dictionaries
  const { marketId,  selectionId, teamPlayerId, pointsId } = outcomes[outcomeId]

  const selection = selections[selectionId]
  const teamPlayer = teamPlayers[teamPlayerId]
  const point = points[pointsId]

  let selectionName = selection

  if (
    teamPlayer
    && MARKET_IDS___USE_TEAM_PLAYER_INSTEAD_OUTCOME.includes(marketId)
  ) {
    selectionName = teamPlayer
  }

  if (params?.withPoint && point !== undefined) {
    selectionName += ` (${point})`
  }

  return selectionName
}

export default assembleSelectionName
