const fs = require('fs')
const path = require('path')
const { OUT_DIR } = require('./constants')


module.exports = async function createIndexFile(sources) {
  const filenames = Object.keys(sources)

  const imports = filenames.map((filename) => `import ${filename} from './${filename}'`)
  const exports = filenames.map((filename) => `${filename}`)
  const content = `${imports.join('\n')}\n\nexport default {\n  ${exports.join(',\n  ')}\n}\n`

  await fs.promises.writeFile(path.resolve(OUT_DIR, 'index.ts'), content)
}
