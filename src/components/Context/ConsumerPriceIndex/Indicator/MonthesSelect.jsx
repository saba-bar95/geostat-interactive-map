import { useContext } from "react";
import { PriceQueriesContext } from "../ConsumerPriceIndex";
import { useParams } from "react-router";
import monthes from "./monthes";

const MonthesSelect = () => {
  const { language } = useParams();

  const { indicatorMonth, setIndicatorMonth } = useContext(PriceQueriesContext);

  const handleIndicatorChange = (e) => {
    const selected = parseInt(e.target.value, 10);
    setIndicatorMonth(selected);
  };

  return (
    <select
      value={indicatorMonth}
      name="indicatorSelect"
      onChange={handleIndicatorChange}>
      {monthes.map((month) => (
        <option key={month.value} value={month.value}>
          {language === "ge" ? month.name_ge : month.name_en}
        </option>
      ))}
    </select>
  );
};

export default MonthesSelect;
