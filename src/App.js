import React, { Component } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from './components/Profile';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="container mt-5">
          <Profile />
        </div>
      </div>
    );
  }
}

export default App;