import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react';

class MovieSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.title
    };
  }

  componentDidUpdate (prevState) {
    if (prevState.title !== this.props.title) {
      this.setState({ value: this.props.title });
    }
  }

  onClick = () => {
    this.props.setSearchTerm(this.state.value);
  };

  handleChange = (event) => {
    if (event) {
      this.setState({
        value: event.target.value
      })
    }
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onClick();
    }
  };

  render() {
    const { value } = this.state;
    return(
      <Input
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        value={value}
        fluid
        action={{ content: 'Search', onClick: (e) => { this.onClick(); } }}
        placeholder="Movie Title"
      />
    )
  }
}

export default MovieSearch;