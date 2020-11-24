import './App.css';
import {useState} from 'react';
import {piano88keys} from './noteLib.js';
import Piano from './Piano.js';
import Bar from './Bar.js';

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
      console.log("listener triggered!", key, key % 12, eventCode)
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
      <Bar />
      <Piano 
        addMidiListener={addMidiListener} 
        keyEventHandler={note => console.log("playing note", note.value, note)}
        notes={notes} 
        />
    </div>
  );
}

export default App;
