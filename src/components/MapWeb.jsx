import "../styles.scss";
import mapWebImg from ".././assets/mapWeb.png";
import pointImg from ".././assets/point2.png";
import React, { useEffect, useRef } from "react";

export default function MapWeb() {
  const canvasRef = useRef();
  const origWidth = 1440;
  const origHeight = 800;

  const points = [
    { x: 900, y: 150 },
    { x: 910, y: 200 },
    { x: 960, y: 230 },
    { x: 1030, y: 270 },
    { x: 1050, y: 330 },
  ];

  const scalePoints = (canvasWidth, canvasHeight) => {
    return points.map((point) => ({
      x: (point.x / origWidth) * canvasWidth,
      y: (point.y / origHeight) * canvasHeight,
    }));
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const mapWebRef = new Image();
    mapWebRef.src = mapWebImg;
    mapWebRef.onload = () => {
      ctx.drawImage(mapWebRef, 0, 0, canvas.width, canvas.height);
      const scaledPoints = scalePoints(canvas.width, canvas.height);
      scaledPoints.forEach((point) => {
        const pointImgRef = new Image();
        pointImgRef.src = pointImg;
        pointImgRef.onload = () => {
          ctx.drawImage(pointImgRef, point.x - 30, point.y - 10, 30, 20);
        };
      });
    };
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const scaledPoints = scalePoints(canvas.width, canvas.height);

      scaledPoints.forEach((point) => {
        if (
          x >= point.x - 25 &&
          x <= point.x + 25 &&
          y >= point.y - 10 &&
          y <= point.y + 10
        ) {
          console.log(`WEB: ${point.x}, ${point.y}`);
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      className="map map-web"
      ref={canvasRef}
      width={1440}
      height={800}
    ></canvas>
  );
}
