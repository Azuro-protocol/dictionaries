const { create, globSource } = require('ipfs-http-client')

const gateway = 'https://ipfs-gateway.azuro.org/ipfs'

const theGraphIpfs = create({ url: "https://api.thegraph.com/ipfs/api/v0" })
const azuroIpfs = create({ url: "https://ipfs-gateway.azuro.org/api/v0" })

const fs = require('fs');

(async () => {

  const dicts = []

  for await (const pathname of ['./v1/maps', './v1/arrays', './v2/maps', './v2/arrays']) {

    for await (const file of azuroIpfs.addAll(globSource(pathname, '**/*.json'))) {
      process.stdout.write('.')
      dicts.push(`${pathname}/${file.path} -> ${gateway}/${file.cid.toString()}`)
    }

    theGraphIpfs.addAll(globSource(pathname, '**/*.json'))
  }

  await fs.promises.writeFile('./README.md', Buffer.from(dicts.join('\n')))

})()
