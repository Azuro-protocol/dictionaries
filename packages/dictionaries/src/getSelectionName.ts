import { MARKET_IDS___USE_TEAM_PLAYER_INSTEAD_OUTCOME } from './constants'
import type { Dictionaries } from './types'


type Props = {
  outcomeId: string | number
  dictionaries: Dictionaries
  withPoint?: boolean
}

const getSelectionName = (props: Props): string => {
  const { outcomes, selections, teamPlayers, points } = props.dictionaries
  const { marketId,  selectionId, teamPlayerId, pointsId } = outcomes[props.outcomeId]

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

  if (props?.withPoint && point !== undefined) {
    selectionName += ` (${point})`
  }

  return selectionName
}

export default getSelectionName
