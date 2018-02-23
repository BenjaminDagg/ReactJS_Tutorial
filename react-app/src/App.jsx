import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

//main app component
class App extends Component {
  
  constructor() {
    super();
    
    this.state = {
      data: [
        {
               "id":1,
               "name":"Foo",
               "age":"20"
            },
            {
               "id":2,
               "name":"Bar",
               "age":"30"
            },
            {
               "id":3,
               "name":"Baz",
               "age":"40"
            }
      ],
      header: "header state...",
      color: false,
      
      //used in form example
      formText: 'Initial text'
    }
    
    this.setStateHandler = this.setStateHandler.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.findDOMNodeHandler = this.findDOMNodeHandler.bind(this);
    this.textChanged = this.textChanged.bind(this);
  };
  
  //demonstrates setState() method which updates values of state for this component
  setStateHandler() {
    var currentState = this.state.data;
    var newItem = {
      "id": 9999,
      "name": "Ben",
      "age": 21
    }
    currentState[0] = newItem;
    
    //ussed to update value of state variable in real time
    this.setState({data: currentState});
  };
  
  //demonstrates force update method when click on button
  //force update updates the entire components state
  forceUpdateHandler() {
    this.forceUpdate();
  };
  
  //demonstrates the findDOMNode() method
  //this method selects a DOM component so you can change it
  //must import ReactDOM from 'ract-dom' to use
  findDOMNodeHandler() {
    var myDiv = document.getElementById('myDiv');
    
    if (this.state.color) {
      ReactDOM.findDOMNode(myDiv).style.color = 'green';
    }
    else {
      ReactDOM.findDOMNode(myDiv).style.color = 'red';
    }
    this.state.color = !this.state.color;
  };
  
  //demonstrates how to bind form to state of a component
  textChanged(caller) {
    this.setState({formText: caller.target.value });
  };
  
  render() {
    var i = 2;
    
    //setting style sheet
    var myStyle = {
      fontSize: 100, //in JSX must use camel case
      color: '#FF0000'
    }
    return (

      <div>
        <Header text={this.state.header}/>
        <table>
               <tbody>
                  {this.state.data.map((person, i) => <TableRow key = {i} 
                     data = {person} />)}
               </tbody>
            </table>
        <Content text={this.props.contentText}/>
        <button onClick = {this.setStateHandler}>Change State</button>
        
        { /* demonstrating force udpate with a randomly generate header */}
        <h1> {Math.random()} </h1>
        <button onClick = {this.forceUpdateHandler}>Update State</button>
        
        { /*Demonstrating findDOMNode() methid */ }
        <div>
          <button onClick = {this.findDOMNodeHandler}> Change DOM</button>
          <div id="myDiv">Testing DOM Node </div>
        </div>
        
        { /*demonstrates binding of data to form 
          To bind state to form set the value of the form
          to a state variable
        */ }
        <h1>The text is {this.state.formText}</h1>
        <FormContent text = {this.state.formText} 
          change = {this.textChanged}></FormContent>
      </div>
      
    );
  }
}

//defines usage restrictions for props so we dont get type errors
//must import PropTypes from prop-types to use this
App.propTypes = {
  contentText: PropTypes.string
};
//defines default values for a components props
App.defaultProps = {
  contentText: "this is content text"
};

//defining new component
/*
These are subcomponents that are used in the app
component. At the end the app compomnent is like the main
and you only need to export it in the index.js
*/
class Header extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.text}</h1>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div>
        <p>This is the conent</p>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.age}</td>
      </tr>
    );
  }
}

class FormContent extends Component {
  render() {
    return (
      <div>
        <form type="text" value = {this.props.text} 
        onChange = {this.props.change} />
      </div>
    );
  }
}

//lets  other files import app component
export default App;
