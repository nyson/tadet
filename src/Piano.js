import React, {useEffect, useState} from 'react';
import {NOTE_PRESS_DOWN_EC, NOTE_PRESS_UP_EC} from './noteLib.js';

const Piano = props => 
  (<div className="piano">
    {Object.keys(props.notes).map(i => (
      <Key 
        listenToMidiEvents={props.addMidiListener}
        note={props.notes[i]}
        key={i}
        />
    ))}
  </div>);

function Key(props) {
  const [on, switchOn] = useState(false);
  console.log("making key", props)
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

export default Piano;