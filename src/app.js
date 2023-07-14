var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const fs = require('fs/promises')
import { puppeteerNovel } from './utils/puppeteer/novel'
import { puppeteerLineEmoji } from './utils/puppeteer/lineEmoji'
import { formatLineEmojiContent } from './utils/fs/formatLineEmojiContent'
import { downloadImageByUrl } from './utils/fs/downloadImageByUrl'
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

const LINE_ICON_FILE_PATH = path.join(__dirname, '../lineIcon.md')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
;(async () => {
  await downloadImageByUrl('https://stickershop.line-scdn.net/sticonshop/v1/sticon/5ac2213e040ab15980c9b447/android/005.png?v=1', '001')
  const res = await puppeteerLineEmoji()
  fs.truncate(LINE_ICON_FILE_PATH, 0)
  const mdStr = formatLineEmojiContent(res)
  await fs.writeFile(LINE_ICON_FILE_PATH, mdStr, { flag: 'a' }, (err) => {
    console.log('The file has been saved!')
  })
})()

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
