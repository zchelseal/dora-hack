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

router.post('/request', function (req, res, next) {
  try{
    if (!req.body.from || !req.body.to || !req.body.contract || !req.body.doc || (!req.body.payment && req.body.payment!=0)) {
      return res.status(400).send('Not enough parameter')
    } else {
      const splitPassage = req.body.doc.split('/\r?\n/')
      const snippet = req.body.doc.substr(0, 150)
      const job = {
        'FromLanguage': req.body.from,
        'ToLanguage': req.body.to,
        'Payment': req.body.payment,
        'ContractAddress': req.body.contract,
        'Snippet': snippet,
        'AllTranslated': false,
        'Reviewed': false
      }
      // insert passage
      return knex('Passage').insert(job).returning('ID')
      .then(id => {
        // parse and insert paragraphs
        let paragraphs = [];
        for (let i = 0; i < splitPassage.length; i++) {
          paragraphs.push({
            'PassageID': id[0],
            'ParagraphIndex': i,
            'OriginalText': String(splitPassage[i]),
            'Assigned': false,
            'Translated': false
          })
        }
        return knex('Paragraph').insert(paragraphs)
        .then(rows => {
          res.send({ received: true })
        })
      })
    }
  } 
  catch(err) { 
    console.log(err)
  }
})

router.get('/receive/:id', function (req, res, next) {
  try{
    if (!req.params.id && req.params.id!=0) {
      return res.status(400).send('Not enough parameter')
    } 
    else {
      // query translated text to user with passageID
      knex('Passage').select('TranslatedText').where({'ID':req.params.id, 'Reviewed':true})
      .then(rows => {
        if (!rows){
          res.send('The translated article is under review - please check back later.')
        }
        else{
          res.send(rows[0])
        }
      })
    }
    /*
    let result = {
      finished: false
    }
    res.send(result)
    */
  }
  catch(err){
    console.log(err)
  }
})

module.exports = router
