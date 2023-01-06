# Dictionaries Package

This package provides 2 features: CLI to download dictionaries; helpers to work with dictionaries.


## Installation

```
npm i --save @azuroprotocol/dictionaries
```


## CLI

All dictionaries stored in [public repository](https://github.com/Azuro-protocol/public-config/tree/main/dictionaries).
For ease of use, the dictionaries have a version and file format.

It's easy to download dictionary files with CLI. In your package.json add script:

```json
"scripts": {
  "get-dicts": "@azuroprotocol/dictionaries -v {VERSION} -o {OUTPUT_DIR}"
}
```

- `VERSION` is the version of the downloaded dictionaries. [Find the version you need here](https://github.com/Azuro-protocol/public-config/tree/main/dictionaries).
- `OUTPUT_DIR` is the directory where to put downloaded files.

```bash
@azuroprotocol/dictionaries -v 2.0.0 -o ./dist # will download v2.0.0 files to ./dist directory
```


## Helpers

```js
import { getMarketKey, getMarketName, getMarketDescription, assembleMarketName } from '@azuroprotocol/dictionaries'
```

```js
import { getMarketKey } from '@azuroprotocol/dictionaries'
import dictionaries from './path-to-downloaded-dictionaries'

const outcomeId = 1
const marketKey = getMarketKey(outcomeId, dictionaries)
```

`getMarketKey(outcomeId, dictionaries)` returns the string key `marketId-gamePeriodId-gameTypeId[-teamPlayerId]` 
built from the dictionaries related to passed `outcomeId`.

In the example above the result is `1-1-1`.

There are two dictionary files `marketNames.js` and `marketDescriptions.js`. `marketKey` is used to receive market name 
and description for specific outcome ID.

```
import dictionaries from './path-to-downloaded-dictionaries'

dictionaries.marketNames['1-1-1'] // "Full Time Result" 
dictionaries.marketDescriptions['1-1-1'] // "You predict the result..."
```

**!!! Note that there are no texts for each `outcomeId` !!!**

`marketNames[marketKey]` and `marketDescriptions[marketKey]` may return `undefined`. For `marketName` generation there 
is other helper `assembleMarketName`. It generates human readable market name based on outcome `marketId`, `gamePeriodId`, 
`gameTypeId`, `teamPlayerId`.

```
import { getMarketKey, assembleMarketName } from '@azuroprotocol/dictionaries'
import dictionaries from './path-to-downloaded-dictionaries'

const outcomeId = 42
const marketKey = getMarketKey(outcomeId, dictionaries)

let marketName = dictionaries[marketKey] // undefined

if (!marketName) {
  marketName = assembleMarketName(outcomeId, dictionaries) // "Whole game - Winner of match Goal"
}
```

There are additional 2 sugar helpers:

```js
import { getMarketName } from '@azuroprotocol/dictionaries'
import dictionaries from './path-to-downloaded-dictionaries'

getMarketName(1, dictionaries) // "Full Time Result"
getMarketName(42, dictionaries) // "Whole game - Winner of match Goal"
```

```js
import { getMarketDescription } from '@azuroprotocol/dictionaries'
import dictionaries from './path-to-downloaded-dictionaries'

getMarketDescription(1, dictionaries) // "You predict the result..."
getMarketDescription(42, dictionaries) // undefined. Note that there is no `assemblyMarketDescription` helper.
```
