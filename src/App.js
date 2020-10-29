import './App.css';
import {useState, useEffect} from 'react';

const NOTE_PRESS_DOWN_EC = 146;
const NOTE_PRESS_UP_EC = 130;


const noterange = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]; // oct 2 to 8
const start = ["A", "A#", "B"]; // oct 1
const end = ["C"]; // oct 9

function octave(notes, start, pitchSuffix){
  let i = start;
  let suffixedNotes = notes.map(x => x + "" + pitchSuffix);
  var o = {};
  suffixedNotes.forEach(note => {
    var index = i++;
    o[index] = {value: index, name: note, flat: note.includes("#")}
  });
  return o;
} 

function piano88keys() {
  let octaves = [];
  octaves.push(octave(start, 21, 1));
  for(var i = 2; i <= 8; i++){
    octaves.push(octave(noterange, 24 + 12*(i-2), i))
  }
  octaves.push(octave(end, 108, 9))
 
  let piano = {};
  for(var o of octaves) {
    for(var k in o) {
      piano[k] = o[k];
    }
  }

  return piano;
}

function midifail(){
  console.log("Could not access midi");
}

function App() {
  const notes = piano88keys();
  let [listeners, setListeners] = useState([]);

  const addMidiListener = (key, f) => {
    listeners[key] = f;
    setListeners(listeners);
  }

  let midiUpdate = (midiData, wrapper) => {
    const [eventCode, key] = midiData;
    console.log("midi event! ", eventCode, key, wrapper.srcElement.id, wrapper);
    if(listeners.length === 0) return;
    if(listeners[key] !== undefined) {
      console.log("listener triggered!", key, eventCode)
      listeners[key](eventCode);
    }
    else 
      console.log("listener not found!", key, listeners)
  }

  function midiSuccess(midi) {
    for(var input of midi.inputs.values())
      input.onmidimessage = x => midiUpdate(x.data, x);
  }
  navigator.requestMIDIAccess().then(midiSuccess, midifail);

  return (
    <div className="App">
      {Object.keys(notes).map(i => 
        <Key 
          listenToMidiEvents={addMidiListener}
          note={notes[i]}
          key={i}>
        </Key>
      )}
    </div>
  );
}

function Key(props) {
  const [on, switchOn] = useState(false);
  useEffect(() => {
    props.listenToMidiEvents(props.note.value, eventCode => {
      switch(eventCode) {
        case NOTE_PRESS_DOWN_EC: 
          switchOn(true);
          break;
        case NOTE_PRESS_UP_EC:
          switchOn(false);
          break;
        default: break;
      }
    });
  });

  let cl = "key " 
    + (on ? "enabled" : "disabled") 
    + (props.note.flat ? " flat" : "")
  return (<div 
    key={props.keyValue}
    className = {cl}
    >
      {"(" + props.note.value + ") " + props.note.name}
  </div>)
}

export default App;
