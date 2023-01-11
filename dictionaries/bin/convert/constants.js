const path = require('path')

module.exports.SOURCE_DIR = path.resolve(__dirname, '../../src')
module.exports.OUT_DIR = path.resolve(__dirname, '../../out')
module.exports.OUTPUT_TS_DIR = path.resolve(__dirname, '../../out/ts')
module.exports.OUTPUT_JS_DIR = path.resolve(__dirname, '../../out/js')
module.exports.OUTPUT_JSON_DIR = path.resolve(__dirname, '../../out/json')
module.exports.OUTPUT_JSON_MAPS_DIR = path.resolve(__dirname, '../../out/json/maps')
module.exports.OUTPUT_JSON_ARRAYS_DIR = path.resolve(__dirname, '../../out/json/arrays')

module.exports.OUT_DIRS = [
  module.exports.OUT_DIR,
  module.exports.OUTPUT_TS_DIR,
  module.exports.OUTPUT_JS_DIR,
  module.exports.OUTPUT_JSON_DIR,
  module.exports.OUTPUT_JSON_MAPS_DIR,
  module.exports.OUTPUT_JSON_ARRAYS_DIR,
]
