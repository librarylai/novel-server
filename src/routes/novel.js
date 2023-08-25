import { puppeteerNovel } from '../utils/puppeteer/novel'
var express = require('express')
var router = express.Router()

router.get('/', async (req, res, next) => {
  const param = req.body.url
  const result = await puppeteerNovel('https://t.uukanshu.com/read.aspx?tid=65713&sid=10962')
  console.log('result', result)
})

module.exports = router
