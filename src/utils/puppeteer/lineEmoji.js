import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
const LINE_ICON_URL = 'https://developers.line.biz/en/docs/messaging-api/emoji-list/#line-emoji-definitions'

function getBackgroundUrl(elStyles) {
  const re = /background: url\("(.*)"\)/gm
  const regexp = new RegExp(re)
  const backgroundUrl = regexp.exec(elStyles)
  return backgroundUrl[1].toString()
}
// 點擊 Line Emoji 網站的 Show all button
async function clickShowMoreButton(page) {
  const buttons = await page.$$('.emoji-grid.mt-3 button') // 抓取所有按钮元素
  let i = 0
  for (let showBtn of buttons) {
    console.log('click', i)
    await showBtn.click()
    i++
  }
  console.log('done')
}
// 取得 Line Emoji 的背景圖片 url 與 code
async function getLineUrlAndIconId(page) {
  let data = []
  // 等待點擊完所有的 show all button 後再來取得 取得 html ,回傳全部的html包含doctype
  let html = await page.content()
  // 爬取內容 讓我們能使用 jQuery 的方式取得 html 元素
  const $ = cheerio.load(html)
  // 取的所有 emoji 的背景圖片 url 與 code
  await $('.m-auto').each(async (i, el) => {
    const elStyles = el.attribs.style
    let code = $(el.next.next.children?.[0]).text()
    data.push({
      backgroundUrl: getBackgroundUrl(elStyles),
      code: code.trim(),
    })
  })
  return data
}

export const puppeteerLineEmoji = async (url = LINE_ICON_URL) => {
  // 啟動瀏覽器
  const browser = await puppeteer.launch()

  // 開啟分頁並前往 Line icon 列表
  const page = await browser.newPage()
  await page.goto(url)

  // 取得所有 show-more 按鈕並且點擊
  await clickShowMoreButton(page)

  // 取得所有 emoji 的背景圖片 url 與 code
  let result = await getLineUrlAndIconId(page)

  await browser.close()
  return result
}
