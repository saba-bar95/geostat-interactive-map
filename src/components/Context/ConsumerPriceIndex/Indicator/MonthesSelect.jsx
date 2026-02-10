import { useContext } from "react";
import { PriceQueriesContext } from "../ConsumerPriceIndex";
import { useParams } from "react-router";

const MonthesSelect = () => {
  const { language } = useParams();

  const months = [
    { name_en: "January", name_ge: "იანვარი", value: 1 },
    { name_en: "February", name_ge: "თებერვალი", value: 2 },
    { name_en: "March", name_ge: "მარტი", value: 3 },
    { name_en: "April", name_ge: "აპრილი", value: 4 },
    { name_en: "May", name_ge: "მაისი", value: 5 },
    { name_en: "June", name_ge: "ივნისი", value: 6 },
    { name_en: "July", name_ge: "ივლისი", value: 7 },
    { name_en: "August", name_ge: "აგვისტო", value: 8 },
    { name_en: "September", name_ge: "სექტემბერი", value: 9 },
    { name_en: "October", name_ge: "ოქტომბერი", value: 10 },
    { name_en: "November", name_ge: "ნოემბერი", value: 11 },
    { name_en: "December", name_ge: "დეკემბერი", value: 12 },
  ];

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
      {months.map((month) => (
        <option key={month.value} value={month.value}>
          {language === "ge" ? month.name_ge : month.name_en}
        </option>
      ))}
    </select>
  );
};

export default MonthesSelect;
