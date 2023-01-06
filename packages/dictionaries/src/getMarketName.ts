import getMarketKey from './getMarketKey'
import assembleMarketName from './assembleMarketName'
import type { Dictionaries } from './types'


const getMarketName = (outcomeId: string | number, dictionaries: Dictionaries): string => {
  const { marketNames } = dictionaries
  const marketKey = getMarketKey(outcomeId, dictionaries)

  if (marketNames[marketKey]) {
    return marketNames[marketKey]
  }

  return assembleMarketName(outcomeId, dictionaries)
}

export default getMarketName
