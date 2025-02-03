// src/App.js
import MapComponent from "./MapComponent/MapComponent";
import Navigation from "./navigation/Navigation";
import "./App.scss"; // Assuming you have some global styles
import queries from "./navigation/queries";
import { useState, createContext, useEffect } from "react";

export const QueriesContext = createContext();

function App() {
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [linkState, setLinkState] = useState(null);

  console.log(linkState);

  const handleSelectQuery = (el) => {
    setSelectedQuery(el);
  };

  const handleSelectLink = (el) => {
    setSelectedLink(el);
  };

  const closeSidebar = () => {
    setSelectedLink(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.27:3001/api/getRegBrunva?year=2022"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLinkState(data); // Set the fetched data to state
      } catch (error) {
        console.error(error.message); // Set error message if fetch fails
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <QueriesContext.Provider
      value={{
        selectedQuery,
        selectedLink,
        handleSelectQuery,
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
