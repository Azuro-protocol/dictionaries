const fs = require('fs')
const path = require('path')
const { create, globSource } = require('ipfs-http-client')


const SOURCE_DIR = '../dictionaries/out'
const IPFS_GATEWAY = 'https://ipfs.bookmaker.xyz/ipfs'
const API_URL = 'https://ipfs.bookmaker.xyz/api/v0'
const DIRECTORIES = [ 'maps', 'arrays' ]

const api = create({ url: API_URL })

const upload = async () => {
  for (const directory of DIRECTORIES) {
    const files = []

    for await (const sourceFile of globSource(SOURCE_DIR, '**/*.json')) {
      const ipfsFile = await api.add(sourceFile.content)

      const CID = ipfsFile.cid.toString()
      const filepath = `.${sourceFile.path}`
      const link = `[${CID}](${IPFS_GATEWAY}/${CID})`

      files.push(`- ${filepath} → ${link}`)

      process.stdout.write('.')

      const outputPath = path.join(SOURCE_DIR, directory, 'README.md')
      const content = Buffer.from(files.join('\n\n'))

      await fs.promises.writeFile(outputPath, content)
    }
  }
}

upload()
