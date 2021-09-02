var mysql = require('mysql');
var Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'iamroot!',
  database: 'randomQuote'
});

Connection.connect(
  (err) => {
    if (err) {
      console.log('ERROR, ERROR setting up dbConnection!')
    } else {
      console.log('Connected to Blake\'s database!')
    }
  }
);

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// get random quote

getRandQuote = (callback) => {
  var integer = 'SELECT COUNT(*) FROM quoteList';
  var queryparam = getRandomInt(0, integer);
  var querystring = 'SELECT * FROM quoteList WHERE id = ?';
  Connection.query(querystring, queryparam,(err, result) => {
    if (err) {
    console.log('Error Getting Random Quote from Database-->', result);
    callback(err, null);
    } else {
    console.log('Successfully Got Random Quote from Database -->', result);
    callback(null, result);
    }
  });
};

// add my new quote

addNewQuote = (newQuote, callback) => {
  var queryparam = [newQuote];
  var querystring = "INSERT INTO quoteList(quote) VALUES ('?')";
  Connection.query(querystring, queryparam,(err, result) => {
    if (err) {
    console.log('Error Inserting New Quote into Database-->', result);
    callback(err, null);
    } else {
    console.log('Successfully Inserted New Quote -->', result);
    callback(null, result);
    }
  });
};


//exports

module.exports = {
  getRandQuote,
  addNewQuote
}