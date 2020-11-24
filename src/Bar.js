import React, {useRef, useEffect} from 'react';

const FillWithPath = (ctx, f) => {
  ctx.beginPath();
  f(ctx);
  ctx.closePath();
  ctx.fill();
}

const Draw = canvasRef => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  
  ctx.fillRect(10, 10, 100, 1);
  ctx.fillRect(10, 20, 100, 1);
  ctx.fillRect(10, 30, 100, 1);
  ctx.fillRect(10, 40, 100, 1);
  ctx.fillRect(10, 50, 100, 1);

  // ctx.beginPath();
  // ctx.ellipse(30, 15, 6, 5, 0, 0, 2*Math.PI);
  // ctx.closePath();
  // ctx.fill();

  // ctx.beginPath();
  // ctx.ellipse(30, 30, 6, 5, 0, 0, 2*Math.PI);
  // ctx.closePath();
  // ctx.fill();

  // ctx.beginPath();
  // ctx.ellipse(19, 35, 6, 5, 0, 0, 2*Math.PI);
  // ctx.closePath();
  // ctx.fill();
  
  DrawNote(ctx, {value:53}, false);
  DrawNote(ctx, {value:57}, false);
  DrawNote(ctx, {value:60}, false);
  DrawNote(ctx, {value:64}, false);

  ctx.fillRect(44,10, 1, 50)
}

/// Returns an integer range from a to b
const Range = (a, b) => {
  let arr = [];
  for(let i = a; i < b; i++)
    arr.push(i);
  return arr;
}

const NoteValToDistance = val => {
  const flats = [1,3,6,8,10];
  console.log(val);
  const res = 53 <= val 
    ? Range(53, val).filter(i => !flats.includes(i % 12)).length
    : -Range(val, 53).filter(i => !flats.includes(i % 12)).length;
  return res;
}

/// Draw a note on the bar
const DrawNote = (ctx, note, onLeftSide = false) => {
  console.log("distance from F5", note.value, );
  const y = 46 - (NoteValToDistance(note.value)*5);
  ctx.beginPath();
  ctx.ellipse(
    50 - (onLeftSide ? 11 : 0), 
    y, 
    5.5, 4.5, 0, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();
  
}

/// Draw a chord
const DrawChord = notes => {

}

const Bar = props => {
  const canvasRef = useRef(null);

  return (<>
    <canvas ref={canvasRef}></canvas>
    <button onClick={() => Draw(canvasRef)}>Draw!</button>
  </>)
}

export default Bar;