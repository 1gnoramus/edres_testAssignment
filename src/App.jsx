import "./styles.scss";
import MapMobile from "./components/MapMobile";
import MapWeb from "./components/MapWeb";

function App() {
  return (
    <div className="App">
      <MapMobile></MapMobile>
      <MapWeb></MapWeb>
    </div>
  );
}

export default App;
