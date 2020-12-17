import './App.css';
import {useState, useEffect} from 'react';
import {piano88keys} from './noteLib.js';
import Piano from './Piano.js';
import Bar from './Bar.js';

function App() {
  const notes = piano88keys();
  const [listeners, setListeners] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [midi, setMidi] = useState(null);
  const [output, setOutput] = useState(null);

  const addMidiListener = (key, f) => {
    listeners[key] = f;
    setListeners(listeners);
  }


  const keyEventHandler = note => {
    console.log(note);
    midi.outputs.forEach((key, port) => console.log("device: ", key, port));
    midi.outputs.forEach((key, port) => {
      console.log("Sending note to port", key, port)   
      key.send([144, note.value, 127])
      setTimeout(() => key.send([130, note.value, 127]), 1000);
      })
  }

  useEffect(() => {
    let midiUpdate = (midiData, wrapper) => {
      const [eventCode, key] = midiData;
      console.log(
        "midi event! ", 
        eventCode, 
        key, 
        wrapper.srcElement.id, 
        wrapper);
      if(listeners.length === 0) return;
      if(listeners[key] !== undefined) {
        console.log("listener triggered!", key, key % 12, eventCode)
        listeners[key](eventCode);
      }
      else 
        console.log("listener not found!", key, listeners)
    }
  
    navigator.requestMIDIAccess()
      .then(midi => {
        console.log("Setting up midi devices")
        for(var input of midi.inputs.values())
          input.onmidimessage = x => midiUpdate(x.data, x);
    
        var os = [];
        midi.outputs.forEach((key, _) => os.push(key));

        setMidi(midi);
        setOutputs(os);
        setOutput(midi.outputs.values().next().value);
      }, _ => console.log("Could not access midi"));

      return () => console.log("unmounting...");
  }, [listeners]);

  console.log(output, outputs);

  return (
    <div className="App">

      <h3>Available outputs:</h3>
      <ol>
        { outputs.map(i => {
          const style = {
            'font-weight': output?.id === i.id 
              ? "bold"
              : "normal"
            };
          return <li key='i.id' 
                     style={style}>
                  {i.name + " (" + i.id + ")"}
                 </li>
        }
         )
        }        
      </ol>
      <Bar />
      <Piano 
        addMidiListener={addMidiListener} 
        keyEventHandler={keyEventHandler}
        notes={notes} 
        />
    </div>
  );
}

export default App;
