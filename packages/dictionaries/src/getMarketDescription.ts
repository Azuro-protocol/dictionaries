import getMarketKey from './getMarketKey'
import type { OnlyOne, Dictionaries } from './types'


type Props = {
  dictionaries: Dictionaries
} & OnlyOne<{
  marketKey: string
  outcomeId: string | number
}>

const getMarketDescription = (props: Props): string => {
  const { marketDescriptions } = props.dictionaries

  let marketKey

  if (props.outcomeId) {
    marketKey = getMarketKey({
      outcomeId: props.outcomeId,
      dictionaries: props.dictionaries,
    })
  }
  else {
    marketKey = props.marketKey!
  }

  return marketDescriptions[marketKey]
}

export default getMarketDescription
