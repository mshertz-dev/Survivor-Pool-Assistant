import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import test from '../../../test.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: test.data
    };
  }

  render () {
    return (
      <div>This is a test</div>
    );
  }
}

export default App;