// src/App.js
import MapComponent from "./MapComponent/MapComponent";
import Navigation from "./navigation/Navigation";
import "./App.scss"; // Assuming you have some global styles

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <div className="map-container">
        <MapComponent />
      </div>
    </div>
  );
}

export default App;
