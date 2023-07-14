## 小說爬蟲

啟動： `yarn start:dev`

取得 Line Emoji 圖片請使用 `puppeteerLineEmoji()`

取得 小說文字 請使用 `puppeteerNovel()`
下載圖片請使用 `downloadImageByUrl()`

## 技術重點

### 操作按鈕點擊

當今天如果有 **多個按鈕** 需要被點擊，可以用 `page.$$()` 來找出所有的按鈕，並且透過 `for(let btn of allBtn)` 來將每個按鈕取出來點擊(` await btn.click`)。

<img width="1204" alt="截圖 2023-07-13 下午5 22 20" src="https://github.com/librarylai/novel-server/assets/38255384/a6e025cc-d0e9-4632-a7c8-a614cac61b73">

> **補充：**
> 這邊也有看到其他做法，就是透過 `page.$$eval` 來取得所有的按鈕，並且透過 `Array.from` 來轉換成陣列，最後再透過 `forEach` 來點擊所有的按鈕。

### 下載圖片

可以透過 `axios` 的 `responseType: stream` 搭配 `fs.createWriteStream` 來下載圖片。
**相關參考：[Axios API 官方](https://axios-http.com/docs/api_intro)**

```javascript
const result = await axios.get(url, {
  responseType: 'stream',
})
result.data.pipe(fs.createWriteStream(`${path.join(__dirname, `../../images/${fileName}.png`)}`))
```

> **補充：**
> 如果是使用 `fetch` API 的話，也可以透過 `response.body.pipe` 來下載圖片。
> 相關參考：[Writing the stream returned by node-fetch](https://stackoverflow.com/questions/55349722/writing-the-stream-returned-by-node-fetch)

```javascript
fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png')
  .then(
    (res) =>
      new Promise((resolve, reject) => {
        const dest = fs.createWriteStream('./tmp.txt')
        res.body.pipe(dest)
        res.body.on('end', () => resolve('it worked'))
        dest.on('error', reject)
      })
  )
  .then((x) => console.log(x))
```
