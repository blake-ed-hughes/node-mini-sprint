import React from 'react';

// pass props to child class
var Quote = ({displayedQuote}) => {
  return (
    <div>
    <h3>Here's a random quote:</h3>
    <div className="random-quote">{displayedQuote}</div>
    </div>
  );
};

export default Quote;