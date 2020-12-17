import React, {useRef, useEffect} from 'react';
import {note} from './noteLib';

const FillWithPath = (ctx, f) => {
  ctx.beginPath();
  f(ctx);
  ctx.closePath();
  ctx.fill();
}

const Clear = canvasRef => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = 'black';
}

const DrawBar = canvasRef => {
  const ctx = canvasRef.current.getContext('2d');
  [...Array(5).keys()]
    .map(n => (n+1)*10)
    .map(h => ctx.fillRect(10, h, 100, 1));
}

const Draw = canvasRef => {
  DrawBar(canvasRef);
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  DrawChord(ctx, [
    {value: 53}, 
    {value: 57},
    {value: 60},
    {value: 64}])
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
const DrawChord = (ctx, notes) => {
  Object.values(notes).map(n => DrawNote(ctx, n, false))

  ctx.fillRect(44,10, 1, 50)
}

const Bar = props => {
  const canvasRef = useRef(null);
  useEffect(() => {
    Clear(canvasRef);
    DrawBar(canvasRef);
    console.log([...Array(12).keys()].map(n => note(n+60)));
  });

  return (<>
    <canvas ref={canvasRef} />
    <button onClick={() => Draw(canvasRef)}>Draw!</button>
  </>)
}

export default Bar;