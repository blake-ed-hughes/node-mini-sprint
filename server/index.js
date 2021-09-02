var db = require('../server/db/index.js') //<<<<<<<< IS THIS THE RIGHT SUB DIRECTORY?
var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();

const port = 3000;

// const { parse } = require('querystring');

app.use(cors());
// app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../react-client/dist')));  // <<<<<<<<<'/../react-client/dist'<<<<<<<< IS THIS THE RIGHT SUB DIRECTORY?


  app.get('/', (req, res) => {
    res.status(200).send('Hello from the server side! - Adele');
  });

  app.get('/quote', (req, res) => {
    // get random quote from the db
    console.log('app.get res-------> ', res);

    db.getRandQuote((err, data) => {
      if(err) {
        res.status(400).send('Failed to retrieve random quote from the server-side');
      } else {
    res.status(201).json('Random quote retrieved from the server-side');
      }
    })
  });


  app.post('/quote', (req, res) => {

    console.log('app.post res-------> ', res);
    // add new quote to the db
    var newQuote = res.body;
    db.addNewQuote(newQuote, (err, data) => {
      if(err) {
        res.status(400).send('Failed to add new quote from the server-side');
      } else {
    res.status(201).send('New quote added from the server-side');
      }
    })
  });


app.listen(port, () => {
console.log('Blake\'s Express server is running in the terminal!');
console.log(`Blake\'s Express server is listening on http://localhost:${port}`);
});