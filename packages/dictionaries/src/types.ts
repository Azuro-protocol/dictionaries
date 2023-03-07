type Outcomes = Record<string, {
  marketId: number
  gamePeriodId: number
  gameTypeId: number
  gameVarietyId: number
  pointsId: number
  selectionId: number
  teamPlayerId: number
}>

export type Dictionaries = {
  outcomes: Outcomes
  markets: Record<string, string>
  sports: Record<string, string>
  gamePeriods: Record<string, string>
  gameTypes: Record<string, string>
  gameVarieties: Record<string, string>
  teamPlayers: Record<string, string>
  selections: Record<string, string>
  points: Record<string, string>
  marketNames: Record<string, string>
  marketDescriptions: Record<string, string>
}
