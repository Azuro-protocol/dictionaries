# Dictionaries Package

The Azuro Dictionaries package is designed to provide easy access to the Azuro Protocol dictionaries, which contain 
mappings between IDs and human-readable strings. The package includes CLI and helpers to make it easy to work with 
these dictionaries in your project.


## Installation

```bash
npm install @azuro-org/dictionaries
```


## Helpers

To use the package in your project, you can import the desired helpers from the package:

```js
import { getMarketKey, getMarketName, getMarketDescription, getSelectionName } from '@azuro-org/dictionaries'
```

The package provides the following helpers:

### `getMarketKey`

Returns a market key - a combination of IDs including the `marketId`, `gamePeriodId`, `gameTypeId`, and `teamPlayerId` 
(if applicable). This key is required to get markets name and description from dictionaries.

```ts
getMarketKey(outcomeId: string | number): string
```

```js
const outcomeId = 1

getMarketKey(outcomeId) // "1-1-1"
```

### `getMarketName`

Returns the human-readable name of the market related to an `outcomeId` or a `marketKey`.

```ts
getMarketName(props: OneOf<{ marketKey: string, outcomeId: string | number }>): string
```

```js
getMarketName({ outcomeId: 1 }) // "Full Time Result"
getMarketName({ marketKey: '1-1-1' }) // "Full Time Result"
```

### `getMarketDescription`

Returns the human-readable description of the market related to an `outcomeId` or a `marketKey`.

```ts
getMarketDescription(props: OneOf<{ marketKey: string, outcomeId: string | number }>): string
```

```js
getMarketDescription({ outcomeId: 1 }) // "You predict the result..."
getMarketDescription({ marketKey: '1-1-1' }) // "You predict the result..."
```

It's important to note that not all `outcomeId` values have a corresponding market name or description. If the name 
doesn't exist in the dictionaries, the helper function will return a concatenated string of values taken from the 
`marketId`, `gamePeriodId`, `gameTypeId`, and `teamPlayerId` IDs.

In cases where there is no market name for the provided `outcomeId`, the helper function will return `undefined`. It's 
important to keep this in mind when using these helper functions to avoid any unexpected behavior.

```js
getMarketName({ outcomeId: 42 }) // "Whole game - Winner of match Goal"
getMarketDescription({ outcomeId: 42 }) // undefined
```

### `getSelectionName`

Returns the human-readable name of the selection related to an `outcomeId`.

```ts
getSelectionName(props: OneOf<{ outcomeId: string | number, withPoint?: boolean }>): string
```

```js
getSelectionName({ outcomeId: 1 }) // "Yes"
getSelectionName({ outcomeId: 4 }) // "Team 2"
getSelectionName({ outcomeId: 4, withPoint: true }) // "Team 2 (4.5)"
```

### Example Usage

```js
import { getMarketName, getMarketDescription, getSelectionName } from '@azuro-org/dictionaries'

const marketName = getMarketName({ outcomeId: 123 })
const marketDescription = getMarketDescription({ outcomeId: 123 })
const selectionName = getSelectionName({ outcomeId: 123 })
```


## CLI

### CLI `get-outcomes`

If you need to get a list of `outcomeId`s related to a specific market name, you can use the `get-outcomes` command.
For example:

```
get-outcomes --market 'Full Time Result'
```

This will return an array of `outcomeId`s that are related to the specified market.

You can use this list to filter conditions in a GraphQL query, like this:

```graphql
query Games($filterConditions: Condition_Filter!) {
  games {
    conditions(where: $filterConditions) {
      conditionId
      core {
        address
      }
      outcomes {
        outcomeId
        odds
      }
    }
  }
}
```

```ts
const outcomeIds = [ '29', '30', '31', '6983', '6984' ] // taken from the result of the command execution

useQuery(GAMES_QUERY, {
  variables: {
    filterConditions: {
      outcomes_: {
        outcomeId_in: outcomeIds
      }
    }
  }
})
```
