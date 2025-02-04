import "./BusinessIndicator.scss";
import indicators from "./indicators";
import years from "./years";
import { useContext } from "react";
import { QueriesContext } from "../../../../App";
import fetchTurnoverData from "../../../../functions/fetchTurnoverData";

const BusinessIndicator = () => {
  const { setData, setIndicator, setIndicatorYear } =
    useContext(QueriesContext);

  const handleIndicatorChanger = (e) => {
    setIndicator(e.target.value);
  };

  const handleYearChange = (e) => {
    const year = e.target.value.split(" ")[0];

    setIndicatorYear(year);

    const getData = async () => {
      const fetchedData = await fetchTurnoverData(year); // Call the utility function
      if (fetchedData) {
        setData(fetchedData); // Set the fetched data to state
      }
    };

    getData(); // Call the fetch function
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

      <div className="container"></div>
    </div>
  );
};

export default BusinessIndicator;
