#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const https = require('https')
const argv = require('minimist')(process.argv.slice(2))


const REMOTE_PATH = 'https://azuro-protocol.github.io/public-config/dictionaries'
const VERSION = argv.version || argv.v
const OUTPUT_PATH = argv.output || argv.o
const FILE_TYPE = argv.type || argv.t

const FILE_TYPE_TO_REMOTE_TYPE_DIR = {
  'ts': 'ts',
  'js': 'js',
  'maps': 'json/maps',
  'arrays': 'json/arrays',
}

const REMOTE_TYPE_DIR = FILE_TYPE_TO_REMOTE_TYPE_DIR[FILE_TYPE]

const FILES = [
  'outcomes',
  'sports',
  'markets',
  'gamePeriods',
  'gameTypes',
  'gameVarieties',
  'teamPlayers',
  'points',
  'selections',
  'marketNames',
  'marketDescriptions',
]

const downloadFile = (filename) => {
  const localFilepath = path.resolve(OUTPUT_PATH, `${filename}.js`)
  const remoteFilepath = `${REMOTE_PATH}/v${VERSION}/${REMOTE_TYPE_DIR}/${filename}.js`

  const pipeHandler = fs.createWriteStream(localFilepath)

  https.get(remoteFilepath, (res) => {
    res.on('data', () => {
      if (res.statusCode !== 200) {
        console.error(`Error downloading ${remoteFilepath}:`, res.statusMessage)
        process.exit(1)
      }
    })

    res.pipe(pipeHandler)
  })
}

const createIndexFile = (type) => {
  const outputPath = path.resolve(OUTPUT_PATH, `index.${type}`)
  const content = `${FILES.map((filename) => `import ${filename} from './${filename}'`).join('\n')}

export default {
  ${FILES.map((filename) => `${filename}`).join(',\n  ')}
}  
`

  fs.promises.writeFile(outputPath, content)
}

const download = () => {
  console.log(`Start downloading dictionaries@${VERSION}.`)
  FILES.forEach(downloadFile)

  if (FILE_TYPE === 'ts' || FILE_TYPE === 'js') {
    createIndexFile(FILE_TYPE)
  }
}

if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH)
}

download()
