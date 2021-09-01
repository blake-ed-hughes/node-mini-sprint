import React from 'react';
import axios from 'axios';
import Quote from './Quote.jsx'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

      randomQuote: [],
      formInputText: ''

    };
     //bind form handlers
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  // form event handlers
  handleInputChange(event) {

    this.setState({formInputText: event.target.value});

  }

  handleSubmitClick(event) {

    // event.preventDefault();

    // post request to render when submitted
    axios.post('http://localhost:3000/quote', this.state.formInputText, {
      headers: {'Content-Type': 'text/plain'},

    })
      .then(res => {
        console.log('HERE IS THE POST DATA--> ', res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  // get request to render data upon loading
  componentDidMount() {
    axios.get('http://localhost:3000/quote')
      .then(res => {
        console.log('HERE IS THE GET DATA--> ', res.data);
        var aRandomQuote = res.data;
        this.setState({
          randomQuote: aRandomQuote,
          formInputText: ''
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // render elements
  render() {
    return (
      <div>
        <h1>Blake's Random Quote Generator</h1>
        <div>
          <input type="text" value={this.state.formInputText} onChange={this.handleInputChange.bind(this)}/>
          <button onClick={this.handleSubmitClick.bind(this)}>
            Submit
          </button>
        </div>

        <div>
          <Quote displayedQuote={this.state.randomQuote}/>
        </div>
      </div>
   );
  }

};

export default App;
