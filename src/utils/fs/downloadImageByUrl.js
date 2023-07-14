import axios from 'axios'
import fs from 'fs'
var path = require('path')

export async function downloadImageByUrl(url, fileName) {
  const result = await axios.get(url, {
    responseType: 'stream',
  })
  result.data.pipe(fs.createWriteStream(`${path.join(__dirname, `../../images/${fileName}.png`)}`))
}
