import "./Indicator.scss";
import indicators from "./indicators";
import years from "./years";
import { useContext } from "react";
import { QueriesContext } from "../../../../App";

const Indicator = () => {
  //   const { linkState, setLinkState } = useContext(QueriesContext);

  //   console.log(linkState);

  return (
    <div className="business-indicator">
      <div className="container">
        <select name="indicatorSelect" id="indicator" className="indicator">
          {indicators.map((el) => {
            return <option key={el}>{el}</option>;
          })}
        </select>
      </div>
      <div className="container">
        <select name="yearSelect" id="year">
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

export default Indicator;
