import React, { Component } from 'react';


class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', currentID: 1 };
  }

  onInputChange = (event) => {
    this.setState({ title: event.target.value });
  }

  onInputClick = (event) => {
    console.log(`new node added with id:${this.state.currentID}`);
    const note = {
      title: this.state.title,
      text: 'HELLOOO',
      x: 400,
      y: 12,
      zIndex: 26,
    };
    this.props.onNewNote(note);
  }


  render() {
    return (
      <div id="input-bar">
        <input onChange={this.onInputChange} value={this.state.title} />
        <button onClick={this.onInputClick}>Add new note</button>
      </div>
    );
  }
}

export default Input;
