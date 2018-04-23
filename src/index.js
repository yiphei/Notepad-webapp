import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import debounce from 'lodash.debounce';
import Immutable from 'immutable';
import Note from './components/note';
import Input from './components/input';
import './style.scss';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };
  }

  componentDidMount = () => {
    db.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }


  add = (note) => {
    // this.setState({
    //   notes: this.state.notes.set(id, note),
    // });
    db.addNoteFB(note.title, note.text);
  }

  update = (id, fields) => {
    // this.setState({
    //   notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    // });
    db.updateNoteFB(id, Object.assign({}, this.state.notes.id, fields));
  }

  delete = (id) => {
    db.deleteNoteFB(id);
  }


  renderNotes = () => {
    return this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Note id={id} note={note} deleteNote={this.delete} updateNote={this.update} />
      );
    });
  }


  render() {
    return (
      <div>
        <Input onNewNote={this.add} />
        <div id="notes-section">
          {this.renderNotes()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
