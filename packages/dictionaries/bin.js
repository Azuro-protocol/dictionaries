#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const https = require('https')
const argv = require('minimist')(process.argv.slice(2))


const REMOTE_PATH = 'https://azuro-protocol.github.io/public-config/dictionaries'
const VERSION = argv.version || argv.v
const OUTPUT_PATH = argv.output || argv.o
const FILE_TYPE = argv.type || argv.t

const filesData = {
  'ts': {
    dir: 'ts',
    type: 'ts'
  },
  'js': {
    dir: 'js',
    type: 'js'
  },
  'maps': {
    dir: 'json/maps',
    type: 'json'
  },
  'arrays': {
    dir: 'json/arrays',
    type: 'json'
  },
}

const fileData = filesData[FILE_TYPE]

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

const downloadFile = (filename, version) => {
  const localFilepath = path.resolve(OUTPUT_PATH, `${filename}.${fileData.type}`)
  const remoteFilepath = `${REMOTE_PATH}/${version}/${fileData.dir}/${filename}.${fileData.type}`

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

const getLatestVersion = () => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/repos/azuro-protocol/public-config/contents/dictionaries',
      method: 'GET',
      headers: {
        'User-Agent': 'Azuro-protocol',
      }
    }

    const req = https.request(options, (res) => {
      let body = ''

      res.on('data', (chunk) => {
        body += chunk
      })

      res.on('end', () => {
        let resp = JSON.parse(body)

        resolve(resp[resp.length - 1].name)
      })
    })

    req.on('error', (err) => {
      console.error(err)
      process.exit(1)
    })

    req.end()
  })
}

const download = async () => {
  let version

  if (!VERSION || VERSION === 'latest') {
    version = await getLatestVersion()
  }
  else {
    version = `v${VERSION.replace(/[^.\d]/g, '')}`
  }

  console.log(`Start downloading dictionaries@${version}`)

  FILES.forEach((filename) => {
    downloadFile(filename, version)
  })

  if (FILE_TYPE === 'ts' || FILE_TYPE === 'js') {
    createIndexFile(FILE_TYPE)
  }
}

if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH)
}

download()
