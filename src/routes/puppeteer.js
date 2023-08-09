import { puppeteerLineEmoji } from '../utils/puppeteer/lineEmoji'
import express from 'express'
router = express.Router()

router.get('/lineEmoji', async (req, res, next) => {
  const result = await puppeteerLineEmoji()
  fs.truncate(LINE_ICON_FILE_PATH, 0)
  const mdStr = formatLineEmojiContent(result)
  await fs.writeFile(LINE_ICON_FILE_PATH, mdStr, { flag: 'a' }, (err) => {
    console.log('The file has been saved!')
  })
})
