// src/App.js
import MapComponent from "./MapComponent/MapComponent";
import Navigation from "./navigation/Navigation";
import "./App.scss"; // Assuming you have some global styles
import queries from "./navigation/queries";
import { useState, createContext } from "react";

export const QueriesContext = createContext();

function App() {
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [selectedLink, setSelectedLink] = useState(null);

  const handleSelectQuery = (el) => {
    setSelectedQuery(el);
  };

  const handleSelectLink = (el) => {
    setSelectedLink(el);
  };

  const closeSidebar = () => {
    setSelectedLink(null);
  };

  return (
    <QueriesContext.Provider
      value={{
        selectedQuery,
        handleSelectQuery,
        selectedLink,
        handleSelectLink,
        closeSidebar,
      }}>
      <div className="app-container">
        <Navigation />
        <div className="map-container">
          <MapComponent />
        </div>
      </div>
    </QueriesContext.Provider>
  );
}

export default App;
