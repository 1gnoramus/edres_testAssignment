import "../styles.scss";
import mapMobileImg from ".././assets/mapMobile.png";
import pointImg from ".././assets/point2.png";
import React, { useEffect, useRef } from "react";

export default function MapMobile() {
  const canvasRef = useRef();

  const points = [
    { x: 450, y: 100, text: "Первый этап" },
    { x: 550, y: 120, text: "Второй этап" },
    { x: 630, y: 150, text: "Третий этап" },
    { x: 550, y: 170, text: "Четвертый этап" },
    { x: 450, y: 175, text: "Пятый этап" },
  ];
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const mapMobileRef = new Image();
    mapMobileRef.src = mapMobileImg;
    mapMobileRef.onload = () => {
      ctx.drawImage(mapMobileRef, 0, 0, canvas.width, canvas.height);

      points.forEach((point) => {
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

      points.forEach((point) => {
        if (
          x >= point.x - 30 &&
          x <= point.x &&
          y >= point.y - 10 &&
          y <= point.y + 10
        ) {
          alert(`${point.text}`);
          //   console.log(`MOBILE: ${point.x}, ${point.y}`);
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
      className="map map-mobile"
      ref={canvasRef}
      width={640}
      height={480}
    ></canvas>
  );
}
