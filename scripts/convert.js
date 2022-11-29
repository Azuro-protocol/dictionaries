const { globSource } = require('ipfs-http-client')
const path = require('path')

const fs = require('fs');


(async () => {

  for await (const file of globSource('./v1/maps', '**/*.json')) {
    const content = JSON.parse(await fs.promises.readFile(path.join('./v1/maps', file.path), 'utf-8'))

    let map

    if (file.path.match('betTypeOdds')) {
      map = Object.keys(content).map((key) => ({ betTypeOddId: parseInt(key), ...content[key] }))
    } else {
      map = Object.keys(content).map((key) => ({ id: parseInt(key), value: content[key] }))
    }
    const json = JSON.stringify(map, null, 2)
    await fs.promises.writeFile(path.join('./v1/arrays', path.basename(file.path)), Buffer.from(json))

  }

  for await (const file of globSource('./v2/maps', '**/*.json')) {
    const content = JSON.parse(await fs.promises.readFile(path.join('./v2/maps', file.path), 'utf-8'))

    let map

    if (file.path.match('outcomes')) {
      map = Object.keys(content).map((key) => ({ outcomeId: parseInt(key), ...content[key] }))
    } else {
      map = Object.keys(content).map((key) => ({ id: parseInt(key), value: content[key] }))
    }
    const json = JSON.stringify(map, null, 2)
    await fs.promises.writeFile(path.join('./v2/arrays', path.basename(file.path)), Buffer.from(json))

  }

})()
