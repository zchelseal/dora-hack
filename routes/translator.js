var express = require('express')
var router = express.Router()

router.get('/view', function (req, res, next) {
  // DB action
  let result = [{
    ID: '1',
    snippet: 'It is FRIDAY MY DUDES',
    from_language: 'English',
    to_language: 'Chinese',
    payment: '0.5'
    // leftParagraph: '3'
  },
  {
    ID: '2',
    snippet: 'It is MONDAY MY DUDES',
    from_language: 'India',
    to_language: 'Chinese',
    payment: '0.2'
    // leftParagraph: '5'
  },
  {
    ID: '3',
    snippet: 'FLY TO MOON',
    from_language: 'Chinese',
    to_language: 'English',
    payment: '0.45'
    // leftParagraph: '10'
  }]
  res.send(result)
})

router.post('/accept', function (req, res, next) {
  if (!req.body.ID || !req.body.paragraph) {
    return res.status(400).send('Not enough parameter')
  } else {
    let result = [{
      doc: 'Lorem Ipsum is simply dummy text of the printing'
    }]
    res.send(result)
  }
})

router.post('/submit', function (req, res, next) {
  if (!req.body.passage) {
    return res.status(400).send('Not enough parameter')
  }
})
// router.post('/request', function (req, res, next) {
//   if (!req.body.language || !req.body.topic || !req.body.payment) {
//     return res.status(400).send('Not enough parameter')
//   } else {
//     let language = req.body.language
//     let topic = req.body.topic
//     let payment = req.body.payment
//     let doc = req.body.doc
//     console.log(language, topic, payment, doc)
//     res.send('OK')
//   }
// })

// router.get('/receive', function (req, res, next) {

//   return
// })

module.exports = router
