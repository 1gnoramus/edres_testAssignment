import "../styles.scss";
import mapMobileImg from ".././assets/mapMobile.png";
import pointImg from ".././assets/point2.png";
import React, { useEffect, useRef, useState } from "react";

export default function MapMobile() {
  const canvasRef = useRef();
  const [canvasSize, setCanvasSize] = useState({ width: 768, height: 1200 });
  const origWidth = 768;
  const origHeight = 1200;
  const points = [
    { x: 490, y: 150, text: "Первый этап" },
    { x: 520, y: 220, text: "Второй этап" },
    { x: 600, y: 270, text: "Третий этап" },
    { x: 710, y: 310, text: "Четвертый этап" },
    { x: 710, y: 410, text: "Пятый этап" },
  ];
  const scalePoints = (canvasWidth, canvasHeight) => {
    return points.map((point) => ({
      x: (point.x / origWidth) * canvasWidth,
      y: (point.y / origHeight) * canvasHeight,
      text: point.text,
    }));
  };
  const updateCanvasSize = () => {
    const width = window.innerWidth;
    const height = (origHeight / origWidth) * width;
    setCanvasSize({ width, height });
  };
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const mapMobileRef = new Image();
    mapMobileRef.src = mapMobileImg;
    mapMobileRef.onload = () => {
      ctx.drawImage(mapMobileRef, 0, 0, canvas.width, canvas.height);
      const scaledPoints = scalePoints(canvas.width, canvas.height);

      scaledPoints.forEach((point) => {
        const pointImgRef = new Image();
        pointImgRef.src = pointImg;
        pointImgRef.onload = () => {
          ctx.drawImage(pointImgRef, point.x - 20, point.y - 10, 30, 20);
        };
      });
    };
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      points.forEach((point) => {
        // console.log(x, point.x);
        if (
          x >= point.x - 50 &&
          x <= point.x - 10 &&
          y >= point.y - 10 &&
          y <= point.y + 10
        ) {
          //   alert(`${point.text}: ${point.x}, ${point.y}`);

          console.log(`MOBILE:${point.x}, ${point.y}`);
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [canvasSize]);

  return (
    <canvas
      className="map map-mobile"
      ref={canvasRef}
      width={canvasSize.width}
      height={1200}
    ></canvas>
  );
}
