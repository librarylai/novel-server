## 小說爬蟲

啟動： `yarn start:dev`

取得 Line Emoji 圖片請使用 `puppeteerLineEmoji()`

取得 小說文字 請使用 `puppeteerNovel()`

## 技術重點

### 操作按鈕點擊

當今天如果有 **多個按鈕** 需要被點擊，可以用 `page.$$()` 來找出所有的按鈕，並且透過 `for(let btn of allBtn)` 來將每個按鈕取出來點擊(` await btn.click`)。

<img width="1204" alt="截圖 2023-07-13 下午5 22 20" src="https://github.com/librarylai/novel-server/assets/38255384/a6e025cc-d0e9-4632-a7c8-a614cac61b73">

> **補充：**
> 這邊也有看到其他做法，就是透過 `page.$$eval` 來取得所有的按鈕，並且透過 `Array.from` 來轉換成陣列，最後再透過 `forEach` 來點擊所有的按鈕。
