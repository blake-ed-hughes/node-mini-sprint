const http = require('http');
// const { parse } = require('querystring');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

//Fill with strings of your favorite quotes :)
var quotes = [
  'this is a quote',
  'here is another quote i like',
  'what even is quote',
  'quote quote quote quotey quote quote',
  'i should really add some quotes later'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  // if (req.url == '/' && req.method == "OPTIONS") {
  //   console.log('redirecting');
  //   res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
  //   res.end();
  // }

  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }

  // TODO: GET ONE √
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    // Use the getRandomInt to randomly select a quote from the quote array
    var randomQuotesIndex = getRandomInt(0, quotes.length);
    // console.log('randomQuotesIndex >>>>>>>>>>>>VALUE>>>>>>>>>>>>>>>> ', randomQuotesIndex);
    // Send status code
    res.writeHead(200, headers);
    // Be sure to .end
    res.end(JSON.stringify(quotes[randomQuotesIndex]));
  }


  // TODO: POST/CREATE
  // Paths should be the same
  else if ((req.url == '/quote/'  || req.url == '/quote') && req.method == "POST") {
    // Adds a new string to the quotes array
    req.on('data', function(chunk) {
      quotes.push('' + chunk);
      // console.log(quotes);
    });
    // Send status code
    res.writeHead(201, headers);
    // Be sure to .end

    res.end(JSON.stringify(quotes));
  }


//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
