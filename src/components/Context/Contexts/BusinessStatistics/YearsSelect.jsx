import { useContext } from "react";
import { useParams } from "react-router";
import { QueriesContext } from "../../../../App";

const YearsSelect = () => {
  const { language } = useParams();
  const { indicators, indicator, indicatorYear, setIndicatorYear } =
    useContext(QueriesContext);

  const years = Array.from({ length: 24 }, (_, i) => 2022 - i);

  const handleYearChange = (e) => {
    setIndicatorYear(Number(e.target.value.split(" ")[0]));
  };

  const disableRules = [
    { indexes: [11], min: 2005 },
    { indexes: [10, 9, 1, 2], min: 2006 },
    { indexes: [4, 5, 7, 11, 12], min: 2007 },
  ];

  const isDisabled = (year) =>
    disableRules.some(
      ({ indexes, min }) =>
        indexes.includes(indicators.indexOf(indicator)) && year < min
    );

  return (
    <select
      name="yearSelect"
      id="year"
      value={indicatorYear}
      onChange={handleYearChange}>
      {years.map((year) => (
        <option key={year} value={year} disabled={isDisabled(year)}>
          {year} {language === "en" ? "Year" : "წელი"}
        </option>
      ))}
    </select>
  );
};

export default YearsSelect;
