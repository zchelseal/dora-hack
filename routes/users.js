var express = require('express')
var router = express.Router()

router.post('/request', function (req, res, next) {
  if (!req.body.language || !req.body.topic || !req.body.payment) {
    return res.status(400).send('Not enough parameter')
  } else {
    let language = req.body.language
    let topic = req.body.topic
    let payment = req.body.payment
    let doc = req.body.doc
    console.log(language, topic, payment, doc)
    res.send('OK')
  }
})

// router.get('/receive', function (req, res, next) {

//   return 
// })

module.exports = router
