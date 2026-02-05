import Navigation from "../../Navigation/Navigation";
import query from "./query";
import { useState, createContext } from "react";
import { Analytics } from "@vercel/analytics/react";

export const PriceQueriesContext = createContext();

const ConsumerPriceIndex = () => {
  const [selectedQuery, setSelectedQuery] = useState(query);
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

  const contextValue = {
    selectedQuery,
    selectedLink,
    handleSelectQuery,
    handleSelectLink,
    closeSidebar,
  };

  return (
    <PriceQueriesContext.Provider value={contextValue}>
      <div className="app-container">
        <Navigation />
        <Analytics />
      </div>
    </PriceQueriesContext.Provider>
  );
};

export default ConsumerPriceIndex;
