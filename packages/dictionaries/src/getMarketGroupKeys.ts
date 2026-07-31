import dictionaries from './dictionaries'
import getMarketKey from './getMarketKey'


type GetMarketGroupKeysParams =
  | { marketKey: string }
  | { outcomeId: string | number }

/**
 * Resolves the market group slugs a LEGACY (dictionary) market belongs to.
 *
 * Uses the coarse `marketGroupsLegacyMap` (marketKey → group slugs). That map is global,
 * so no sport is needed. A market can belong to several groups — "1st Half - Handicap" is
 * both `handicap` and `half` — and it is meant to be shown under each of them. A group's
 * display name and ordering are NOT part of dictionaries — they come from the protocol
 * API's market groups catalog, which is per sport, so slugs the game's sport does not
 * declare are expected and the caller drops them.
 *
 * Returns an empty array when the market has no mapped group (→ the market shows only
 * under "All").
 */
const getMarketGroupKeys = (params: GetMarketGroupKeysParams): string[] => {
  let marketKey: string

  if ('marketKey' in params) {
    marketKey = params.marketKey
  }
  else {
    try {
      marketKey = getMarketKey(params.outcomeId)
    }
    catch {
      return []
    }
  }

  const legacyMap = dictionaries.marketGroupsLegacyMap as Record<string, string[]>

  // The generated map is a plain object, so without an own-property check an inherited member name
  // (`__proto__`, `constructor`, `toString`, ...) would be returned as if it were a group slug.
  if (!Object.prototype.hasOwnProperty.call(legacyMap, marketKey)) {
    return []
  }

  // a copy, so a caller sorting or pushing to the result can't corrupt the dictionary itself
  return [ ...(legacyMap[marketKey] ?? []) ]
}

export default getMarketGroupKeys
