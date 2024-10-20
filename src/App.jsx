import "./styles.scss";
import mapMobile from "./assets/mapMobile.png";
import mapWeb from "./assets/mapWeb.png";
import pointImg from "./assets/point2.png";
import React, { useEffect, useRef } from "react";
import MapMobile from "./components/MapMobile";
import MapWeb from "./components/MapWeb";

function App() {
  return (
    <div className="App">
      <MapMobile></MapMobile>
      <MapWeb></MapWeb>
      {/* <canvas ref={canvasRef} width={640} height={480}></canvas> */}
    </div>
  );
}

export default App;
