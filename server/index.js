var db = require('../server/db/index.js');
var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'react-client', 'dist')));
// app.use(express.static('../react-client/dist'));

  app.get('/', (req, res) => {
    res.status(200).send('Hello from the server side! - Adele');
  });

  app.get('/quote', (req, res) => {
    // get random quote from the db
    // console.log('app.get res-------> ', res);
    db.getRandQuote((err, data) => {
      if(err) {
        console.log('Failed to retrieve random quote from the server-side')
        res.status(400).send(err);
      } else {
        console.log('Random quote retrieved from the server-side--> ', data)
        res.status(200).send(data);
      }
    })
  });

  app.post('/quote', (req, res) => {
    // add new quote to the db
    // console.log('app.post req-------> ', req);
    var newQuote = req.body.inputText;
    // console.log('newQuote -> ', newQuote);
    db.addNewQuote(newQuote, (err, data) => {
      if(err) {
        console.log('Failed to add new quote from the server-side index')
        res.status(400).send(err);
      } else {
        console.log('New quote added from the server-side index');
        res.status(201).send('Posted to database');
      }
    })
  });

app.listen(port, () => {
console.log('Blake\'s Express server is running in the terminal!');
console.log(`Blake\'s Express server is listening on http://localhost:${port}`);
});