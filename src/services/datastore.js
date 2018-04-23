import firebase from 'firebase';


// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAaUWEdDfCj7cjT9cNVhSE3BpFU02vKdgo',
  authDomain: 'lab3cs52-b3eb0.firebaseapp.com',
  databaseURL: 'https://lab3cs52-b3eb0.firebaseio.com',
  projectId: 'lab3cs52-b3eb0',
  storageBucket: 'lab3cs52-b3eb0.appspot.com',
  messagingSenderId: '452436123124',
};
firebase.initializeApp(config);

const database = firebase.database();


export function addNoteFB(titleName, textName) {
  const note = {
    title: titleName,
    text: textName,
    x: 400,
    y: 12,
    zIndex: 26,
  };
  database.ref('notes/').push(note);
}

export function updateNoteFB(id, note) {
  database.ref('notes/').child(id).update(note);
}

export function deleteNoteFB(id) {
  database.ref('notes/').child(id).remove();
}


export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    console.log(newNoteState);
    // do something with new note state
    callback(newNoteState);
  });
}
