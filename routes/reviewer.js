var express = require('express')
var router = express.Router()
var knex = require('knex')({
  client: 'pg',
  version: '7.5',
  connection: {
    host: '127.0.0.1',
    user: 'test',
    password: 'test',
    database: 'hackathon'
  }
})

router.get('/view', function (req, res, next) {
  try{
    // retrieve all jobs that are "allTranslated" but not reviewed
    knex('Passage').select('ID').where({'AllTranslated':true, 'Reviewed':false})
    .then(passageIDs => {
      listToReview = []
      for (let i = 0; i < passageIDs.length; i++) {
        // for each article, one array of paragraphs
        knex('Paragraph').select('OriginalText', 'TranslatedText', 'ParagraphIndex').where('PassageID', passageIDs[i].ID)
        .then(rows => {
          // aggregate translatedText and originalText
          let originalText = ''
          let translatedText = ''
          for (let i = 0; i < rows.length; i++) {
            originalText += '\n'+rows[i].OriginalText
            translatedText += '\n'+rows[i].TranslatedText
          }
          console.log(originalText)
          console.log(translatedText)
          listToReview.push({
            "originalText": originalText,
            "translatedText": translatedText,
            "PassageID": passageIDs[i].ID
          })
          if (i == passageIDs.length - 1){
            res.send(listToReview)
          }
        })
      }
    })
  }
  catch(err) {
    console.log(err)
  }
  /*
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
  res.send(result)*/
})

// 400 with no error message or startigng
router.post('/accept', function (req, res, next) {
  try{
    // update renewed = true based on passageID
    console.log('here')
    if (!req.body.ID) {
      console.log('ID = ' + String(req.body.ID))
      return res.status(400).send('Not enough parameter')
    } else {
      console.log('ID = ' + String(req.body.ID))
      return knex('Passage').update('Reviewed', true).where('PassageID', req.body.ID)
      .then(rows => {
        res.send({ received: true })
      })
    }
  }
  catch(err) {
    console.log(err)
  }
})

/*
router.post('/review', function (req, res, next) {
  if (!req.body.ID || !req.body.approval) {
    return res.status(400).send('Not enough parameter')
  } else {
    let result = {
      received: true
    }
    res.send(result)
  }
})*/

module.exports = router
