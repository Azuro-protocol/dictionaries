const fs = require('fs')
const path = require('path')


module.exports = async (dir, filename, type, content) => {
  const outputPath = path.join(dir, `${filename}.${type}`)

  if (typeof content !== 'string') {
    content = JSON.stringify(content, null, 2)
  }

  await fs.promises.writeFile(outputPath, content)
}
