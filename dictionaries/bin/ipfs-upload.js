const fs = require('fs')
const path = require('path')
const { create, globSource } = require('ipfs-http-client')


const IPFS_GATEWAY = 'https://ipfs.bookmaker.xyz/ipfs'
const API_URL = 'https://ipfs.bookmaker.xyz/api/v0'
const OUT_DIR = '../dictionaries/out'
const FILES_DIRS = [ 'maps', 'arrays' ]

const api = create({ url: API_URL })

const upload = async () => {
  for (const FILES_DIR of FILES_DIRS) {
    const files = []

    for await (const sourceFile of globSource(path.join(OUT_DIR, FILES_DIR), '**/*.json')) {
      const ipfsFile = await api.add(sourceFile.content)

      const CID = ipfsFile.cid.toString()
      const filepath = `.${sourceFile.path}`
      const link = `[${CID}](${IPFS_GATEWAY}/${CID})`

      files.push(`- ${filepath} → ${link}`)

      process.stdout.write('.')

      const outputPath = path.join(OUT_DIR, FILES_DIR, 'README.md')
      const content = Buffer.from(files.join('\n\n'))

      await fs.promises.writeFile(outputPath, content)
    }
  }
}

upload()
