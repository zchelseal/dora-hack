var express = require('express')
var router = express.Router()

router.get('/view', function (req, res, next) {
  let result = [{
    ID: 1,
    paragraph: 5,
    payment: 0.5
    // leftParagraph: '3'
  },
  {
    ID: 2,
    doc: 6,
    payment: 0.2
    // leftParagraph: '5'
  }]
  res.send(result)
})

router.post('/accept', function (req, res, next) {
  if (!req.body.ID) {
    return res.status(400).send('Not enough parameter')
  } else {
    let result = {
      received: true
    }
    res.send(result)
  }
})

router.post('/review', function (req, res, next) {
  if (!req.body.ID || !req.body.approval) {
    return res.status(400).send('Not enough parameter')
  } else {
    let result = {
      received: true
    }
    res.send(result)
  }
})

module.exports = router
