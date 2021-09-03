import React from 'react';
import axios from 'axios';
import Quote from './Quote.jsx'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

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
    // event.preventDefault(); <- only on submission forms
    var submission = this.state.formInputText;

    // post request to render when submitted
    axios.post('http://localhost:3000/quote', {inputText: submission})
      .then(resultOfSuccessfulPost => {
        console.log('HERE IS THE POST DATA--> ', resultOfSuccessfulPost.data);

        this.setState({formInputText: ''});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // get request to render data upon loading
  componentDidMount() {
    axios.get('http://localhost:3000/quote')
      .then(resultOfSuccessfulGetRequest => {
        console.log('HERE IS THE GET DATA--> ', resultOfSuccessfulGetRequest.data);
        var aRandomQuote = resultOfSuccessfulGetRequest.data;
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
          <input type="text" value={this.state.formInputText} onChange={this.handleInputChange}/>
          <button onClick={this.handleSubmitClick}>
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
