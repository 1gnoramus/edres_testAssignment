import "./styles.scss";
import mapMobile from "./assets/mapMobile.png";
import mapWeb from "./assets/mapWeb.png";
import React, { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = mapMobile;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const points = [
        { x: 50, y: 100 },
        { x: 75, y: 200 },
      ];
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);

        ctx.fillStyle = "red";
        ctx.fill();
      });
    };
  }, []);

  return (
    <div className="App">
      {/* <div className="map-cont"></div> */}
      <canvas ref={canvasRef} width={640} height={480}></canvas>
    </div>
  );
}

export default App;
