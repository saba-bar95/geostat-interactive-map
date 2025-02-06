import "./BusinessIndicator.scss";
import indicators from "./indicators";
import years from "./years";
import { useContext, useState } from "react";
import { QueriesContext } from "../../../../../App";
import fetchTurnoverData from "../../../../../functions/fetchTurnoverData";
import numIntervals from "../../../../ColorBox/numIntervals";
import AngleRight from "./AngleRight";
import AngleDown from "./AngleDown";

const BusinessIndicator = () => {
  const {
    setRegData,
    setMunData,
    setIndicator,
    setIndicatorYear,
    regData,
    munData,
    indicator,
    indicatorYear,
  } = useContext(QueriesContext);

  const indicatorInfo = numIntervals[indicator].measurement;

  const [selected, setSelected] = useState(null);

  // console.log(regData);
  // console.log(munData);

  const sortedRegions = regData
    .filter((region) => region[`w_${indicatorYear}`] !== null) // Exclude regions with null values
    .sort((a, b) => b[`w_${indicatorYear}`] - a[`w_${indicatorYear}`]); // Sort in descending order

  const handleIndicatorChanger = (e) => {
    setIndicator(e.target.value);
  };

  const handleYearChange = (e) => {
    const year = e.target.value.split(" ")[0];

    setIndicatorYear(year);

    const getRegData = async () => {
      const fetchedData = await fetchTurnoverData("Reg", year); // Call the utility function
      if (fetchedData) {
        setRegData(fetchedData); // Set the fetched data to state
      }
    };

    const getMunData = async () => {
      const fetchedData = await fetchTurnoverData("Mun", year); // Call the utility function
      if (fetchedData) {
        setMunData(fetchedData);
      }
    };

    if (year > 2013) getMunData();
    getRegData(); // Call the fetch function
  };

  return (
    <div className="business-indicator">
      <div className="container">
        <select
          name="indicatorSelect"
          id="indicator"
          onChange={handleIndicatorChanger}>
          {indicators.map((el) => {
            return <option key={el}>{el}</option>;
          })}
        </select>
      </div>
      <div className="container">
        <select name="yearSelect" id="year" onChange={handleYearChange}>
          {years.map((el) => {
            return (
              <option key={el} selected={el === 2022}>
                {el} წელი
              </option>
            );
          })}
        </select>
      </div>

      <div className="container regions-container">
        <div className="header">
          <p>რეგიონი</p>
          <p>{indicatorInfo}</p>
        </div>
        <div className="regions">
          {sortedRegions.map((region) => (
            <div key={region.region_id} className="paras">
              {region[`w_${indicatorYear}`] > 0 && (
                <>
                  <p>
                    <AngleRight />
                    <AngleDown />

                    {region.name_ge}
                  </p>
                  <p>{region[`w_${indicatorYear}`].toFixed(1)}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessIndicator;
