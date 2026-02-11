import Navigation from "../../Navigation/Navigation";
import query from "./query";
import { useState, createContext, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import MapComponent from "./MapComponent/MapComponent";
import LanguageChanger from "../../LanguageChanger/LanguageChanger";
import fetchPriceRegData from "../../../functions/fetchPriceRegData";
import fetchPriceGroceryData from "../../../functions/fetchPriceGroceryData";
import getPriceIndicators from "../../../functions/getPriceIndicators";
import getPriceIntervals from "../../../functions/getPriceIntervals";
import ColorBox from "./ColorBox/ColorBox";
import fetchPriceInitialYearAndMonth from "../../../functions/fetchPriceInitialYearAndMonth";

export const PriceQueriesContext = createContext();

const ConsumerPriceIndex = () => {
  const { language } = useParams();
  const [selectedQuery, setSelectedQuery] = useState(query);
  const [selectedLink, setSelectedLink] = useState(null);
  const [regData, setRegData] = useState(null);
  const [groceryData, setGroceryData] = useState(null);
  const [indicatorYear, setIndicatorYear] = useState(null);
  const [indicatorMonth, setIndicatorMonth] = useState(null);
  const [indicatorIndex, setIndicatorIndex] = useState(0);
  const [indicator, setIndicator] = useState(
    () => getPriceIndicators(language)[indicatorIndex],
  );
  const [indicators, setIndicators] = useState(() =>
    getPriceIndicators(language),
  );
  const [indicatorInfo, setIndicatorInfo] = useState(
    () =>
      getPriceIntervals(language)[getPriceIndicators(language)[indicatorIndex]],
  );

  useEffect(() => {
    const newIndicators = getPriceIndicators(language);
    setIndicators(newIndicators);
    const clampedIndex = Math.min(indicatorIndex, newIndicators.length - 1);
    setIndicator(newIndicators[clampedIndex]);
    setIndicatorInfo(getPriceIntervals(language)[newIndicators[clampedIndex]]);
  }, [language, indicatorIndex]);

  const indicatorMap = useMemo(
    () => ({
      [indicators[0]]: "getRegWliuriByYearMonth",
      [indicators[1]]: "getRegInpByYearMonth",
    }),
    [indicators],
  );

  const groceryIndicatorMap = useMemo(
    () => ({
      [indicators[0]]: "getMunWliuriByYearMonth",
      [indicators[1]]: "getMunInpByYearMonth",
    }),
    [indicators],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPriceInitialYearAndMonth();
        setIndicatorYear(data.year);
        setIndicatorMonth(data.month);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Only fetch if year and month are available
      if (indicatorYear === null || indicatorMonth === null) return;

      try {
        const indicatorKey = indicatorMap[indicator];

        const data = await fetchPriceRegData(
          indicatorKey,
          indicatorYear,
          indicatorMonth,
        );
        setRegData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [indicatorYear, indicatorMonth, indicator, indicatorMap]);

  useEffect(() => {
    const fetchData = async () => {
      // Only fetch if year and month are available
      if (indicatorYear === null || indicatorMonth === null) return;

      try {
        const indicatorKey = groceryIndicatorMap[indicator];

        const data = await fetchPriceGroceryData(
          indicatorKey,
          indicatorYear,
          indicatorMonth,
        );
        setGroceryData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [indicator, indicatorYear, indicatorMonth, groceryIndicatorMap]);

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
    regData,
    groceryData,
    indicatorInfo,
    indicatorYear,
    setIndicatorYear,
    indicatorMonth,
    setIndicatorMonth,
    indicatorIndex,
    setIndicatorIndex,
    indicator,
    setIndicator,
    indicators,
    setIndicators,
  };

  return (
    <PriceQueriesContext.Provider value={contextValue}>
      <div className="app-container">
        <Navigation />
        <div className="map-container">
          <MapComponent />
        </div>
        <LanguageChanger />
        <ColorBox />
        <Analytics />
      </div>
    </PriceQueriesContext.Provider>
  );
};

export default ConsumerPriceIndex;
