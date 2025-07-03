import "./App.scss";
import MapComponent from "./components/MapComponent/MapComponent";
import Navigation from "./components/Navigation/Navigation";
import queries from "./components/Navigation/queries";
import { useState, createContext, useEffect } from "react";
import ColorBox from "./components/ColorBox/ColorBox";
import getBrunva from "./functions/fetchFunctions/getBrunva";
import LanguageChanger from "./components/LanguageChanger/LanguageChanger";
import { useParams } from "react-router";
import getIndicators from "./functions/getIndicators";
import getIntervals from "./functions/getIntervals";

export const QueriesContext = createContext();

function App() {
  const { language } = useParams();

  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [regData, setRegData] = useState(null);
  const [munData, setMunData] = useState(null);
  const [indicatorYear, setIndicatorYear] = useState(2022);
  const [indicators, setIndicators] = useState(() => getIndicators(language));
  const [indicatorIndex, setIndicatorIndex] = useState(0);
  const [indicator, setIndicator] = useState(
    () => getIndicators(language)[indicatorIndex]
  );
  const [indicatorInfo, setIndicatorInfo] = useState(
    () => getIntervals(language)[getIndicators(language)[indicatorIndex]]
  );

  useEffect(() => {
    const newIndicators = getIndicators(language);
    setIndicators(newIndicators);
    const clampedIndex = Math.min(indicatorIndex, newIndicators.length - 1);
    setIndicator(newIndicators[clampedIndex]);
    setIndicatorInfo(getIntervals(language)[newIndicators[clampedIndex]]);
  }, [language, indicatorIndex]);

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
    const getData = async () => {
      const fetchedData = await getBrunva("Reg", 2022); // Call the utility function
      if (fetchedData) {
        setRegData(fetchedData); // Set the fetched data to state
      }
    };

    const getMunData = async () => {
      const fetchedData = await getBrunva("Mun", 2022); // Call the utility function
      if (fetchedData) {
        setMunData(fetchedData);
      }
    };

    getMunData();
    getData(); // Call the fetch function
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <QueriesContext.Provider
      value={{
        selectedQuery,
        selectedLink,
        indicatorYear,
        closeSidebar,
        regData,
        munData,
        setRegData,
        setMunData,
        setIndicatorYear,
        handleSelectLink,
        handleSelectQuery,
        indicators,
        indicator,
        indicatorInfo,
        setIndicator,
        setIndicatorIndex,
      }}>
      <div className="app-container">
        <Navigation />
        <div className="map-container">
          <MapComponent />
        </div>
        <ColorBox />
        <LanguageChanger />
      </div>
    </QueriesContext.Provider>
  );
}

export default App;
