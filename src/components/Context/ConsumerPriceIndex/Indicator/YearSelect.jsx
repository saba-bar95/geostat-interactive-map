import { useContext } from "react";
import { PriceQueriesContext } from "../ConsumerPriceIndex";
import { useParams } from "react-router";

const YearSelect = () => {
  const { indicatorYear, setIndicatorYear } = useContext(PriceQueriesContext);
  const years = Array.from({ length: 23 }, (_, i) => 2026 - i);
  const { language } = useParams();

  const handleIndicatorChange = (e) => {
    const selected = parseInt(e.target.value, 10);
    setIndicatorYear(selected);
  };

  return (
    <select
      value={indicatorYear}
      name="indicatorSelect"
      onChange={handleIndicatorChange}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year} {language === "en" ? "Year" : "წ"}
        </option>
      ))}
    </select>
  );
};

export default YearSelect;
