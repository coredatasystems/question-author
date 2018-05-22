import React, { Component } from 'react';
import logo from './logo.svg';

import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Add Question</h1>
        </header>
        <div className="container">
          { window.location.hash === '#submitted' &&
            <div className="alert alert-success" role="alert">
              Question saved.
            </div>
          }
          <QuestionForm />
          <QuestionList />
        </div>
      </div>
    );
  }
}

export default App;
