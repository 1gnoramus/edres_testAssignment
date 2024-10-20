import "./styles.scss";
import mapMobile from "./assets/mapMobile.png";
import mapWeb from "./assets/mapWeb.png";
import pointImg from "./assets/point2.png";
import React, { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = mapMobile;

    const points = [
      { x: 450, y: 100 },
      { x: 550, y: 120 },
      { x: 630, y: 150 },
      { x: 550, y: 170 },
      { x: 450, y: 175 },
    ];
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      points.forEach((point) => {
        const pointImgRef = new Image();
        pointImgRef.src = pointImg;

        ctx.drawImage(pointImgRef, point.x - 30, point.y - 10, 30, 20);
      });
    };
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      console.log(rect);
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      console.log(x);

      points.forEach((point) => {
        // if (x == point.x && y == point.y) {
        //   console.log(`LOL: ${point.x}, ${point.y}`);
        // }
        if (
          x >= point.x - 30 &&
          x <= point.x &&
          y >= point.y - 10 &&
          y <= point.y + 10
        ) {
          console.log(`LOL: ${point.x}, ${point.y}`);
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
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
