const { create, globSource } = require('ipfs-http-client')

const gateway = 'https://ipfs-gateway.azuro.org/ipfs'

const theGraphIpfs = create({ url: "https://api.thegraph.com/ipfs/api/v0" })
const azuroIpfs = create({ url: "https://ipfs-gateway.azuro.org/api/v0" })

const fs = require('fs');

(async () => {

  const dicts = []

  for await (const pathname of ['./dictionaries/v1/maps', './dictionaries/v1/arrays', './dictionaries/v2/maps', './dictionaries/v2/arrays']) {

    for await (const file of azuroIpfs.addAll(globSource(pathname, '**/*.json'))) {
      process.stdout.write('.')
      dicts.push(`- ${pathname}/${file.path} → [${file.cid.toString()}](${gateway}/${file.cid.toString()})`)
    }

    theGraphIpfs.addAll(globSource(pathname, '**/*.json'))
  }

  await fs.promises.writeFile('./dictionaries/README.md', Buffer.from(dicts.join('\n\n')))

})()
