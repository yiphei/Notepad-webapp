import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
// import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import marked from 'marked';


class Note extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, editedTitle: this.props.note.title, editedText: this.props.note.text };
  }

  onNoteDelete = (event) => {
    this.props.deleteNote(this.props.id);
  }

  onEdit = (event) => {
    this.setState({ isEditing: true });
  }

  onDrag = (e, ui) => {
    const n = {
      x: ui.x,
      y: ui.y,
    };
    this.props.updateNote(this.props.id, n);
  }

  onTextChange = (event) => {
    this.setState({ editedText: event.target.value });
  }


  onTitleChange = (event) => {
    this.setState({ editedTitle: event.target.value });
  }

  onSubmit = (event) => {
    this.setState({ isEditing: false });

    const n = {
      title: this.state.editedTitle,
      text: this.state.editedText,
    };
    this.props.updateNote(this.props.id, n);
  }


  renderTextBox = () => {
    if (!this.state.isEditing) {
      return (
        <div id={this.props.id} className="note-detail">
          <div className="title-bar">
            <div className="titleBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.title || '') }} />
            <div className="buttons">
              <i onClick={this.onEdit} className="far fa-edit fa-lg" />
              <i onClick={this.onNoteDelete} className="far fa-trash-alt fa-lg" />
              <i className="fas fa-expand-arrows-alt fa-lg drag" />
            </div>
          </div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    } else {
      return (
        <div id={this.props.id} className="note-detail">
          <div className="title-bar">
            <input className="titleBody" onChange={this.onTitleChange} value={this.state.editedTitle} />
          </div>
          <input className="noteBody" onChange={this.onTextChange} value={this.state.editedText} />
          <button onClick={this.onSubmit}>Done</button>
        </div>
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".drag"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onDrag={this.onDrag}
      >
        {this.renderTextBox()}
      </Draggable>
    );
  }
}

export default Note;
