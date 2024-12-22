import React, { useEffect, useRef } from 'react';

function Canvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    console.log("canvas info:",canvas)
    const ctx = canvas.getContext("2d");
    
    canvas.className = "center-container"
    canvas.width =1000
    canvas.height =1000
    ctx.fillStyle = "grey"; // กำหนดสี
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
  }, [])


  return (
    <>
      <canvas ref={canvasRef}/>
      <div></div>
    </>
  );
}

export default Canvas;