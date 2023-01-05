const path = require('path')
const { create, globSource } = require('ipfs-http-client')

const gateway = 'https://ipfs.bookmaker.xyz/ipfs'

const api = create({ url: "https://ipfs.bookmaker.xyz/api/v0" })
const fs = require('fs')

const directories = ['maps', 'arrays']

;(async () => {

  
  for (const directory of directories) {

    const dicts = []

    for await (const sourceFile of globSource(path.join('../dictionaries/', directory), '**/*.json')) {
  
      const file = await api.add(sourceFile)
      dicts.push(`- ./${directory}${sourceFile.path} → [${file.cid.toString()}](${gateway}/${file.cid.toString()})`)
  
      process.stdout.write('.')
      await fs.promises.writeFile(path.join('../dictionaries/', directory, 'README.md'), Buffer.from(dicts.join('\n\n')))
    }
  
  }

})()
