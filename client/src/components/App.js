import React, { Component } from 'react';
import MovieSearch from './MovieSearch';
import MovieList from './MovieList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  setSearchTerm = (title) => {
    this.setState({ title });
  };

  handleMovieClick = (movie) => {
    this.setSearchTerm(movie.title);
  };

  render() {
    const { title } = this.state;
    return (
      <div>
        <div className="search-header">
          <div className="logo">What2watch</div>
          <div className="search-box">
            <MovieSearch setSearchTerm={this.setSearchTerm} title={title} />
          </div>
        </div>
        <div className="result-container" >
          <MovieList title={title} onMovieClick={this.handleMovieClick} />
        </div>
      </div>
    );
  }
}

export default App;