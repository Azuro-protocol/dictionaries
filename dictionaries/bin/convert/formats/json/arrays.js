const { OUTPUT_JSON_ARRAYS_DIR } = require('../../constants')
const writeFile = require('../../writeFile')


module.exports = async (sources) => {
  for (let filename in sources) {
    let content = sources[filename]

    if (filename === 'outcomes') {
      content = Object.keys(content).map((key) => ({
        outcomeId: parseInt(key),
        ...content[key],
      }))
    }
    else {
      content = Object.keys(content).map((key) => ({
        id: parseInt(key),
        value: content[key],
      }))
    }

    await writeFile(OUTPUT_JSON_ARRAYS_DIR, filename, 'json', content)
  }
}
