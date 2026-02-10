import { useContext } from "react";
import { PriceQueriesContext } from "../ConsumerPriceIndex";

const IndicatorSelect = () => {
  const { indicators, indicator, setIndicator, setIndicatorIndex } =
    useContext(PriceQueriesContext);

  const handleIndicatorChange = (e) => {
    const selected = e.target.value;
    const index = indicators.indexOf(selected);

    setIndicatorIndex(index);
    setIndicator(selected);
  };

  return (
    <select
      style={{ width: "100%" }}
      value={indicator}
      name="indicatorSelect"
      onChange={handleIndicatorChange}>
      {indicators.map((el) => (
        <option key={el}>{el}</option>
      ))}
    </select>
  );
};

export default IndicatorSelect;
