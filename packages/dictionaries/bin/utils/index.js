const fs = require('fs')
const path = require('path')
const https = require('https')


const REMOTE_PATH = 'https://azuro-protocol.github.io/public-config/dictionaries'

const REMOTE_FOLDER = {
  'ts': 'ts',
  'js': 'js',
  'maps': 'json/maps',
  'arrays': 'json/arrays',
}

const OUTPUT_FILETYPE = {
  'ts': 'ts',
  'js': 'js',
  'maps': 'json',
  'arrays': 'json',
}

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

const downloadFile = async (filename, filetype, version, outputPath) => {
  const remoteFolder = REMOTE_FOLDER[filetype]
  const outputFiletype = OUTPUT_FILETYPE[filetype]
  const localFilepath = path.resolve(outputPath, `${filename}.${outputFiletype}`)
  const remoteFilepath = `${REMOTE_PATH}/${version}/${remoteFolder}/${filename}.${outputFiletype}`

  const pipeHandler = fs.createWriteStream(localFilepath)

  return new Promise((resolve) => {
    https.get(remoteFilepath, (res) => {
      res.pipe(pipeHandler)

      res
        .on('data', () => {
          if (res.statusCode !== 200) {
            console.error(`Error downloading ${remoteFilepath}:`, res.statusMessage)
            process.exit(1)
          }
        })
        .on('end', () => {
          // console.log(`File "${remoteFilepath}" downloaded successfully.`)
          resolve()
        })
    })
      .on('error', (err) => {
        console.error(err)
        process.exit(1)
      })
  })
}

const createIndexFile = (filetype, outputPath) => {
  const content = `${FILES.map((filename) => {
    if (filetype === 'js') {
      `const ${filename} = require('./${filename}')`
    }
    
    return `import ${filename} from './${filename}'`
  }).join('\n')}

${filetype === 'js' ? 'module.exports =' : 'export default'} {
  ${FILES.map((filename) => `${filename}`).join(',\n  ')}
}  
`

  fs.promises.writeFile(path.resolve(outputPath, `index.${filetype}`), content)
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

const downloadDictionaries = async ({ filetype, version, outputPath }) => {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath)
  }

  if (!version || version === 'latest') {
    version = await getLatestVersion()
  }
  else {
    version = `v${version.replace(/[^.\d]/g, '')}`
  }

  console.log(`Start downloading dictionaries@${version}`)

  await Promise.all(
    FILES.map((filename) => (
      downloadFile(filename, filetype, version, outputPath)
    ))
  )

  if ([ 'js', 'es', 'ts' ].includes(filetype)) {
    createIndexFile(filetype, outputPath)
  }
}

module.exports.downloadDictionaries = downloadDictionaries
