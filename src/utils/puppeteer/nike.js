import puppeteer from 'puppeteer'
const NIKE_LOGIN_URL = 'https://www.nike.com/tw/member/profile/login?continueUrl=https://www.nike.com/tw/'

export const puppeteerNikeLogin = async (url = NIKE_LOGIN_URL) => {
  // 啟動瀏覽器
  const browser = await puppeteer.launch({
    headless: false,
  })

  // 開啟分頁並前往 Nike 列表
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' }) // networkidle2: avigation is finished when there are no more than 2 network connections for at least 500 ms.
  // 取得 html
  let html = await page.content()
  // 爬取內容
  const joinUs = await page.$('.nike-unite-component.action-link.current-member-signin a')

  if (joinUs) {
    await joinUs.click()
    await page.type('input[name="emailAddress"]', 'aaaaa444@gmail.com', { delay: 100 })
    await page.type('input[name="password"]', 'KI0000123la', { delay: 100 })
    await page.type('input[name="lastName"]', 'ADR', { delay: 100 })
    await page.type('input[name="firstName"]', 'WEN', { delay: 100 })
    await page.$eval('input[name="dateOfBirth"]', (e) => (e.value = '1990-01-01'))
    await page.select('select[name="country"]', 'TW')
    await page.type('input[name="gender"]', 'M', { delay: 100 }) // M or F
    await page.click('ul[data-componentname="gender"] input[type=button]')
    const submitBtn = await page.$('input[value="加入"]')
    await submitBtn.click()
  } else {
  }
  await browser.close()
  return null
}
