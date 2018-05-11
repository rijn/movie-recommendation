import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import { Navbar, NavbarGroup, Alignment, NavbarHeading, NavbarDivider, Button, InputGroup } from '@blueprintjs/core';

import styles from './styles/App.scss';

class App extends Component {
  handleSearchInputChange = event => {
    let searchQuery = event.target.value;
    console.log(searchQuery);
  }

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Navbar>
            <NavbarGroup align={Alignment.CENTER} style={{ justifyContent: 'center' }}>
              <NavbarHeading>What2Watch</NavbarHeading>
              <NavbarDivider />
              <InputGroup
                leftIcon="search"
                round="true"
                onChange={this.handleSearchInputChange}
              />
            </NavbarGroup>
          </Navbar>
        </div>
      </Router>
    );
  }
}

export default App;
