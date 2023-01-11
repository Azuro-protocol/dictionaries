const { OUTPUT_JSON_MAPS_DIR } = require('../../constants')
const writeFile = require('../../writeFile')


module.exports = async (sources) => {
  for (let filename in sources) {
    await writeFile(OUTPUT_JSON_MAPS_DIR, filename, 'json', sources[filename])
  }
}
