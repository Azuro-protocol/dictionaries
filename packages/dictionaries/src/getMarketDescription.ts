import getMarketKey from './getMarketKey'
import type { Dictionaries } from './types'


const getMarketDescription = (outcomeId: string | number, dictionaries: Dictionaries): string => {
  const { marketDescriptions } = dictionaries
  const marketKey = getMarketKey(outcomeId, dictionaries)

  return marketDescriptions[marketKey]
}

export default getMarketDescription
