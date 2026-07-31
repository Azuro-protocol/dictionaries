# Azuro Dictionaries

## Market groups

Group **names** and per-sport **ordering** are not part of this package — they are served by the protocol
API, so they stay current without a republish. `getMarketGroupKeys` only resolves a legacy market to its
group slugs; the caller pairs those slugs with the API catalog.

A market belongs to **every group it fits** — "1st Half - Handicap" is both `handicap` and `half` — so the
map holds an array per market key. Because the map is global and catalogs are per-sport, a slug the game's
sport does not declare is expected; the caller drops it (the market stays reachable under "All").

The slug map `dictionaries/marketGroupsLegacyMap.js` is generated from an internal tool and a raw taxonomy
snapshot. Neither the generator nor its inputs are part of this public repo (kept out via `.gitignore`) —
only the generated map is committed. Regenerating requires the internal tool and a current snapshot; ask the data team.

## How to update

1. Edit files in `./dictionaries` directory.
2. Update `package.json` version in `./packages/dictionaries`. Change patch version if json format stays same. Change minor version if format changes. Change major version if the lib or dictionaries format completely reworked.
3. Run `npm publish` in `./packages/dictionaries` dictionary.
4. Don't forget to push changes!
