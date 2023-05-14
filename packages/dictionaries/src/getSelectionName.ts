import dictionaries from './dictionaries'
import { MARKET_IDS___USE_TEAM_PLAYER_INSTEAD_OUTCOME } from './constants'


type Props = {
  outcomeId: string | number
  withPoint?: boolean
}

const getSelectionName = (props: Props): string => {
  const { outcomes, selections, teamPlayers, points } = dictionaries
  const { marketId,  selectionId, teamPlayerId, pointsId } = outcomes[props.outcomeId]

  const selection = selections[selectionId]
  const teamPlayer = teamPlayerId ? teamPlayers[teamPlayerId] : null
  const point = pointsId ? points[pointsId] : null

  let selectionName = selection

  if (
    teamPlayer
    && MARKET_IDS___USE_TEAM_PLAYER_INSTEAD_OUTCOME.includes(marketId)
  ) {
    selectionName = teamPlayer
  }

  if (props?.withPoint && point !== null && point !== undefined) {
    selectionName += ` (${point})`
  }

  return selectionName
}

export default getSelectionName
