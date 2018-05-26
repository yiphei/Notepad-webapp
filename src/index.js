import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import debounce from 'lodash.debounce';
import Immutable from 'immutable';
import Note from './components/note';
import Input from './components/input';
import './style.scss';
// import * as db from './services/datastore';
import io from 'socket.io-client';

const socketserver = 'http://localhost:9090';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    this.state = {
      notes: Immutable.Map(),
    };
  }

  componentDidMount = () => {
    this.socket.on('notes', (notes) => {
      // where you handle all the setState and immutable stuff
      // keep this
      this.setState({ notes: Immutable.Map(notes) });
    });
  }


  add = (note) => {
    // this.setState({
    //   notes: this.state.notes.set(id, note),
    // });

    // db.addNoteFB(note.title, note.text);

    this.socket.emit('createNote', note);
  }

  update = (id, fields) => {
    // this.setState({
    //   notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    // });

    // db.updateNoteFB(id, Object.assign({}, this.state.notes.id, fields));


    this.socket.emit('updateNote', id, Object.assign({}, this.state.notes.id, fields));
  }

  delete = (id) => {
    this.socket.emit('deleteNote', id);

    // db.deleteNoteFB(id);
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
