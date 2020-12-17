import React, {useEffect, useState} from 'react';
import {NOTE_PRESS_DOWN_EC, NOTE_PRESS_UP_EC} from './noteLib.js';

const Piano = props => 
  (<div className="piano">
    {Object.keys(props.notes).map(i => (
      <Key 
        listenToMidiEvents={props.addMidiListener}
        keyEventHandler={props.keyEventHandler}
        note={props.notes[i]}
        key={i}
        />
    ))}
  </div>);

function Key(props) {
  const [on, switchOn] = useState(false);
  const [pressed, press] = useState(false);
  
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
    + (on ? "playing" : "")
    + (props.note.flat ? " flat" : "")
    + (pressed ? " pressed" : "")
  return (<div 
    key={props.keyValue}
    className = {cl}
    onMouseDown={e => {
      e.preventDefault();
      press(true);
      props.keyEventHandler(props.note)
    }}
    onMouseUp={e => {
      e.preventDefault();
      press(false);
    }}
    onMouseLeave={e => {
      e.preventDefault();
      if(pressed) 
        press(false);
    }}
    
    >
      {"(" + props.note.value + ") " + props.note.name}
  </div>)
}

export default Piano;