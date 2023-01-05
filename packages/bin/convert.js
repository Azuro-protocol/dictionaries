const { globSource } = require('ipfs-http-client')
const path = require('path')

const fs = require('fs')

const MAPS_DIR = '../dictionaries/maps'
const ARRAYS_DIR = '../dictionaries/arrays'


;(async () => {

  for await (const file of globSource(MAPS_DIR, '**/*.json')) {
    const content = JSON.parse(await fs.promises.readFile(path.join(MAPS_DIR, file.path), 'utf-8'))

    let map

    if (file.path.match('outcomes')) {
      map = Object.keys(content).map((key) => ({ outcomeId: parseInt(key), ...content[key] }))
    } else {
      map = Object.keys(content).map((key) => ({ id: parseInt(key), value: content[key] }))
    }
    const json = JSON.stringify(map, null, 2)

    if (!fs.existsSync(ARRAYS_DIR)) {
      await fs.promises.mkdir(ARRAYS_DIR)
    }

    await fs.promises.writeFile(path.join(ARRAYS_DIR, path.basename(file.path)), Buffer.from(json))

  }

})()
