$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  function getQuote(successCB, errorCB = null){
    // $.get('http://localhost:3000/quote', data => {console.log('DATA:', data)});
    //YOUR CODE HERE, Add a GET request
    $.ajax({
      url:'http://localhost:3000/quote',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log('DATA:', data);
      },
      error: errorCB || function (error) {
        console.error('Failed to create quote', error);
      }
    });

  }

  function addQuote(quote, successCB, errorCB = null){

    //YOUR CODE HERE, Add a POST request
    $.ajax({
      url: 'http://localhost:3000/quote',
      type: 'POST',
      data: quote,
      dataType: 'json',
      success: function (data) {
        console.log('DATA:', data)
      },
      error: errorCB || function (error) {
        console.error('Failed to create quote', error);
      }
    });
  }
});
