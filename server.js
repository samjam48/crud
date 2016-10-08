const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://sam:password@ds035006.mlab.com:35006/zellapp', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {   // get info from the form as an object
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
      })
})


app.post('/quotes', (req, res) => { // post info to database 
  if("quote" in req.body){
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
  }
  else{
    db.collection('quotes').find({name: req.body.nameSearch}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {quotes: result});
    })
  }

});


app.post('/change', (req, res) => {   // post persons UPDATED details to db
    db.collection('quotes').findOneAndUpdate({name: req.body.oldName}, {
      $set: {
        name: req.body.newName,
        quote: req.body.editQuote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err);
    res.redirect('/')
    })
});


app.delete('/quotes', (req, res) => {  // deletes requested object
  db.collection('quotes').findOneAndDelete({name: req.body.nameDelete}, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/');
  });
})
