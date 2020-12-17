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

export function note(noteVal) {
  const oct = Math.floor(noteVal/12);
  return { 
    0:  {oct: oct, pos: 0, mod: "nat"},     // C
    1:  {oct: oct, pos: 0, mod: "sharp"},   // C#
    2:  {oct: oct, pos: 1, mod: "nat"},     // D
    3:  {oct: oct, pos: 1, mod: "sharp"},   // D#
    4:  {oct: oct, pos: 2, mod: "nat"},     // E
    5:  {oct: oct, pos: 3, mod: "nat"},     // F
    6:  {oct: oct, pos: 3, mod: "sharp"},   // F#
    7:  {oct: oct, pos: 4, mod: "nat"},     // G
    8:  {oct: oct, pos: 4, mod: "sharp"},   // G#
    9:  {oct: oct, pos: 5, mod: "nat"},     // A
    10: {oct: oct, pos: 5, mod: "sharp"},   // A"
    11: {oct: oct, pos: 6, mod: "nat"},     // B
  }[noteVal % 12]
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
