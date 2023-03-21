import assembleSelectionName from './assembleSelectionName'
import type { Dictionaries } from './types'


const getSelectionName = (outcomeId: string | number, dictionaries: Dictionaries): string => {
  return assembleSelectionName(outcomeId, dictionaries)
}

export default getSelectionName
