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

  ctx.beginPath();
  ctx.ellipse(30, 15, 6, 5, 0, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(30, 30, 6, 5, 0, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(19, 35, 6, 5, 0, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillRect(24,10, 1, 40)
}

const Bar = props => {
  const canvasRef = useRef(null);

  return (<>
    <canvas ref={canvasRef}></canvas>
    <button onClick={() => Draw(canvasRef)}>Draw!</button>
  </>)
}

export default Bar;