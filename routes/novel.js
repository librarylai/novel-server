import { puppeteerNovel } from '../utils/puppeteer'

router.get('/', async (req, res, next) => {
  const param = req.body.url
  const res = await puppeteerNovel('https://t.uukanshu.com/read.aspx?tid=65713&sid=10962')
  console.log('res', res)
})
