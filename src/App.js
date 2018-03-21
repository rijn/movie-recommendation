import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import styles from './styles/App.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.app}>
          <p>Hello World</p>
        </div>
      </Router>
    );
  }
}

export default App;
