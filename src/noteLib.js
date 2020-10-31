export const NOTE_PRESS_DOWN_EC = 146;
export const NOTE_PRESS_UP_EC = 130;


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

export function piano88keys() {
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
