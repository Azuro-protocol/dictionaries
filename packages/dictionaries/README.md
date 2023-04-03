# Dictionaries Package

The Azuro Dictionaries package is designed to provide easy access to the Azuro Protocol dictionaries, which contain 
mappings between IDs and human-readable strings. The package includes several CLI and helpers to make it easy to work with 
these dictionaries in your project.


## Installation

```bash
npm install @azuro-org/dictionaries
```


## CLI

### CLI `get-dictionaries`

All dictionaries are stored in a [public repository](https://github.com/Azuro-protocol/public-config/tree/main/dictionaries) 
on GitHub. To download them use CLI.

In your `package.json` file, add the following script:

```json
"get-dictionaries": "get-dictionaries -o {OUTPUT_DIR} -v {VERSION} -t {FILES_TYPE}"
```

Replace the following placeholders:

- `{OUTPUT_DIR}`: the directory where to store the downloaded files.
- `{VERSION}`: the version of the dictionaries to download (use `latest` for the latest version).
- `{FILES_TYPE}`: the file format (`ts`, `js`, `maps` or `arrays`)


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


## Helpers

To use the package in your project, you can import the desired helpers from the package:

```js
import { getMarketKey, getMarketName, getMarketDescription, getSelectionName } from '@azuro-org/dictionaries'
```

The package provides the following helpers:

### `getMarketKey`

This function generates a string `marketKey` from an `outcomeId`. A `marketKey` is a combination of other IDs, including 
the `marketId`, `gamePeriodId`, `gameTypeId`, and `teamPlayerId` (if applicable). This function takes an object with 
the `outcomeId` and `dictionaries` as properties.

```js
getMarketKey({ outcomeId: '1', dictionaries }) // "1-1-1"
```

### `getMarketName`

This function returns the human-readable name of the market related to an `outcomeId` or a `marketKey`. This function takes 
an object with either the `outcomeId` or `marketKey` and `dictionaries` as properties.

```js
getMarketName({ outcomeId: '1', dictionaries }) // "Full Time Result"
getMarketName({ marketKey: '1-1-1', dictionaries }) // "Full Time Result"
```

### `getMarketDescription`

This function returns the human-readable description of the market related to an `outcomeId` or a `marketKey`. This 
function takes an object with either the `outcomeId` or `marketKey` and `dictionaries` as properties.

```js
getMarketDescription({ outcomeId: '1', dictionaries }) // "You predict the result..."
getMarketDescription({ marketKey: '1-1-1', dictionaries }) // "You predict the result..."
```

It's important to note that not all `outcomeId` values have a corresponding market name or description. If the name 
doesn't exist in the dictionaries, the helper function will return a concatenated string of values taken from the 
`marketId`, `gamePeriodId`, `gameTypeId`, and `teamPlayerId` IDs.

In cases where there is no market name for the provided `outcomeId`, the helper function will return `undefined`. It's 
important to keep this in mind when using these helper functions to avoid any unexpected behavior.

```js
getMarketName({ outcomeId: '42', dictionaries }) // "Whole game - Winner of match Goal"
getMarketDescription({ outcomeId: '42', dictionaries }) // undefined
```

### `getSelectionName`

This function returns the human-readable name of the selection related to an `outcomeId`. This function takes an object 
with the `outcomeId`, `dictionaries` and `withPoint` (if applicable) as properties.

```js
getSelectionName({ outcomeId: '1', dictionaries }) // "Yes"
getSelectionName({ outcomeId: '4', dictionaries }) // "Team 2"
getSelectionName({ outcomeId: '4', dictionaries, withPoint: true }) // "Team 2 (4.5)"
```


### Example

```js
import { getMarketName, getSelectionName } from '@azuro-org/dictionaries'
import dictionaries from './path/to/dictionaries'

const marketKey = getMarketKey({ outcomeId: '123', dictionaries })
const marketName = getMarketName({ marketKey, dictionaries })
const selectionName = getSelectionName({ outcomeId: '123', dictionaries })
```
