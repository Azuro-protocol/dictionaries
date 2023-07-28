# Azuro Dictionaries

## How to update

1. Edit files in `./dictionaries` directory.
2. Update `package.json` version in `./packages/dictionaries`. Change patch version if json format stays same. Change minor version if format changes. Change major version if the lib or dictionaries format completely reworked.
3. Run `npm publish` in `./packages/dictionaries` dictionary.
4. Don't forget to push changes!
