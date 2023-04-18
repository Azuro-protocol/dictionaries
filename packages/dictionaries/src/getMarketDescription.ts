import dictionaries from './dictionaries'
import getMarketKey from './getMarketKey'
import type { OneOf } from './types'


type Props = OneOf<{
  marketKey: string
  outcomeId: string | number
}>

const getMarketDescription = (props: Props): string => {
  const { marketDescriptions } = dictionaries

  let marketKey

  if (props.outcomeId) {
    marketKey = getMarketKey(props.outcomeId)
  }
  else {
    marketKey = props.marketKey!
  }

  return marketDescriptions[marketKey]
}

export default getMarketDescription
