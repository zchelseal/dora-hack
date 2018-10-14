var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var translatorRouter = require('./routes/translator')

var app = express()
const port = 3000

// view engine setup
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/translator', translatorRouter)

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
  res.send('error in backend')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
