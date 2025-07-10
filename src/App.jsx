import "./App.scss";
import MapComponent from "./components/MapComponent/MapComponent";
import Navigation from "./components/Navigation/Navigation";
import queries from "./components/Navigation/queries";
import { useState, createContext, useEffect, useMemo } from "react";
import ColorBox from "./components/ColorBox/ColorBox";
import LanguageChanger from "./components/LanguageChanger/LanguageChanger";
import { useParams } from "react-router";
import getIndicators from "./functions/getIndicators";
import getIntervals from "./functions/getIntervals";
import fetchData from "./functions/fetchData";
import fetchPayGender from "./functions/fetchPayGender";

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
    const fetchAllData = async () => {
      const [regDataRes, munDataRes] = await Promise.all([
        fetchData("Brunva", "Reg", 2022),
        fetchData("Brunva", "Mun", 2022),
      ]);

      if (regDataRes) setRegData(regDataRes);
      if (munDataRes) setMunData(munDataRes);
    };

    fetchAllData();
  }, []);

  const indicatorMap = useMemo(
    () => ({
      [indicators[0]]: "Brunva",
      [indicators[1]]: "ValAdded",
      [indicators[2]]: "Employed",
      [indicators[3]]: "Employees",
      [indicators[4]]: "Resale",
      [indicators[5]]: "Investment",
      [indicators[6]]: "ProdVal",
      [indicators[7]]: "Purchases",
      [indicators[8]]: "Remuneration",
      [indicators[9]]: "Costs",
      [indicators[10]]: "IntConsumption",
      [indicators[11]]: "RegEmployeesGender",
      [indicators[12]]: "PayGender",
    }),
    [indicators]
  );

  useEffect(() => {
    const runFetch = async () => {
      const indicatorKey = indicatorMap[indicator];
      if (!indicatorKey) return;

      if (indicator === indicators[12] || indicator === indicators[11]) {
        const regDataRes = await fetchPayGender(indicatorKey, indicatorYear);
        if (regDataRes) setRegData(regDataRes);
        setMunData(null);
        return;
      }

      const shouldFetchMun = indicatorYear > 2013;
      const regScale = indicator === indicators[1] ? "" : "Reg";

      const [regRes, munRes] = await Promise.all([
        fetchData(indicatorKey, regScale, indicatorYear),
        shouldFetchMun ? fetchData(indicatorKey, "Mun", indicatorYear) : null,
      ]);

      if (regRes) setRegData(regRes);
      if (munRes) setMunData(munRes);
    };

    runFetch();
  }, [
    indicatorYear,
    indicator,
    indicatorMap,
    indicators,
    setRegData,
    setMunData,
  ]);

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
