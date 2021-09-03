// const promise = require('bluebird');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'iamroot!',
  database: 'randomQuote'
});

connection.connect(
  (err) => {
    if (err) {
      console.log('ERROR, ERROR setting up connection in db index!')
    } else {
      console.log('Connected to Blake\'s database!')
    }
  }
);

// get quote count from db
var getQuoteCount = (callback) => {
  var querystring = 'SELECT COUNT(*) FROM quoteList';
  connection.query(querystring, (err, resultCount) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, resultCount[0]['COUNT(*)']);
    }
  });
};

//Utility Function to return a random integer
//The maximum is exclusive and the minimum is inclusive
var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// get random quote from db
var getRandQuote = (callback) => {

  getQuoteCount((err,resultCount) => {
    if (err) {
      console.log('Error in nested getQuoteCount --> ', err);
    callback(err, null);
    } else {
      // random integer within quote count range
      var randomInteger = getRandomInt(0, resultCount);
      var queryparam = [randomInteger];
      var querystring = 'SELECT quote FROM quoteList WHERE quoteId = ?';
      connection.query(querystring, queryparam,(err, result) => {
        if (err) {
          console.log('Error getting random quote from database query -->', err);
          callback(err, null);
        } else {
          console.log('Successfully got random quote from database query -->', result[0].quote);
          callback(null, result[0].quote);
        }
      });
    }
  });
};

// add my new quote to the db
var addNewQuote = (newQuote, callback) => {
  var queryparam = [newQuote];
  var querystring = "INSERT INTO quoteList(quote) VALUES (?)";
  connection.query(querystring, queryparam,(err, result) => {
    if (err) {
      console.log('Error INSERTING new quote into database-->', err);
      callback(err, null);
    } else {
      console.log('Successfully INSERTED new quote into database -->', result);
      callback(null, result);
    }
  });
};


//exports
module.exports = {
  getRandQuote,
  addNewQuote
}