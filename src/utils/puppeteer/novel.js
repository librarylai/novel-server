import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

const NOVEL_URL = 'https://t.uukanshu.com/read.aspx?tid=65713&sid=10962'

export const puppeteerNovel = async (url = NOVEL_URL) => {
  // 啟動瀏覽器
  const browser = await puppeteer.launch()

  // 開啟分頁並前往蝦皮頁面
  const page = await browser.newPage()
  await page.goto(url)

  // 取得 html
  let html = await page.content()
  // 爬取內容
  const $ = cheerio.load(html)
  let data = []
  const content = await $('#bookContent p').each((i, el) => data.push($(el).text()))
  await browser.close()
  return data
}
