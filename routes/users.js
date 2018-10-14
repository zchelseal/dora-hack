var express = require('express')
var router = express.Router()

router.post('/request', function (req, res, next) {
  if (!req.body.from || !req.body.to || !req.body.doc || !req.body.payment) {
    return res.status(400).send('Not enough parameter')
  } else {
    let from = req.body.fromlanguage
    let to = req.body.tolanguage
    let payment = req.body.payment
    let doc = req.body.doc

    let result = {
      received: true
    }
    res.send(result)
  }
})

router.get('/receive', function (req, res, next) {
  let result = {
    finished: false
  }
  res.send(result)
})

// router.get('/receive', function (req, res, next) {

//   return 
// })

module.exports = router
