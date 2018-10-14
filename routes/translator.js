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

/*
      let result = [{
        ID: 1,
        index: 1,
        snippet: 'It is FRIDAY MY DUDES',
        from_language: 'English',
        to_language: 'Chinese',
        payment: 0.5
        // leftParagraph: '3'
      },
      {
        ID: 2,
        index: 3,
        snippet: 'It is MONDAY MY DUDES',
        from_language: 'India',
        to_language: 'Chinese',
        payment: 0.2
        // leftParagraph: '5'
      },
      {
        ID: 3,
        index: 4,
        snippet: 'FLY TO MOON',
        from_language: 'Chinese',
        to_language: 'English',
        payment: 0.45
        contractAddress: '10'
      }]
*/
router.get('/view', function (req, res, next) {
  // DB action
  // TODO: searching & filtering
  // retrieve all jobs that have paragraphs left
  try{
    knex.raw('SELECT "ID", "ParagraphIndex", "Snippet", "FromLanguage", "ToLanguage", "Payment", "ContractAddress" FROM "Passage" RIGHT JOIN "Paragraph" on "Passage"."ID" = "Paragraph"."PassageID" WHERE "AllTranslated" <> true')
    //knex.from('Passage').select('ID', 'FromLanguage', 'ToLanguage', 'Payment', 'Snippet', 'ContractAddress').where('AllTranslated', false)
    .then(rows => {
      console.log(rows.rows)
      res.send(rows.rows)
    })
  }
  catch(err) {
    console.log(err)
  }
})

router.post('/accept', function (req, res, next) {
  if ((!req.body.ID && req.body.ID!=0) || (!req.body.index && req.body.index!=0)) {
    return res.status(400).send('Not enough parameter')
  } else {
    // get originalText based on ID and paragraphIndex
    try{
      knex.from('Paragraph').select('OriginalText').where({
        'PassageID': req.body.ID,
        'ParagraphIndex': req.body.index
      })
      .then(rows => {
        res.send(rows[0])
      })
    }
    catch(err){
      console.log(err)
    }
    /*
    let result = [{
      doc: 'Lorem Ipsum is simply dummy text of the printing'
    }]
    res.send(result)*/
  }
})

router.post('/submit', function (req, res, next) {
  if (!req.body.passage || (!req.body.ID && req.body.ID!=0) || (!req.body.index && req.body.index!=0)) {
    return res.status(400).send('Not enough parameter')
  } else {
    try{
      // update the translated to true in paragraphs
      return knex('Paragraph').update({
        'TranslatedText': req.body.passage,
        'Translated': true
      }).where({
        'PassageID': req.body.ID,
        'ParagraphIndex': req.body.index
      })
      .then(rows => {
        // update value of AllTranslated in passage, if needed
        return knex.raw('SELECT bool_and("Translated") FROM "Paragraph" WHERE "PassageID" = ' + String(req.body.ID))
        .then(rows => {
          if (rows.rows[0].bool_and){
            return knex('Passage').update('AllTranslated', true).where({'ID': req.body.ID})
            .then(rows => {
              res.send({ received: true, allTranslated: true })
            })
          }
          res.send({ received: true, allTranslated: false })
        })
      })
    }
    catch(err){
      console.log(err)
    }
  }
})

module.exports = router
