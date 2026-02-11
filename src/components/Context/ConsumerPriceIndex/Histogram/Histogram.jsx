import MonthesSelect from "../Indicator/MonthesSelect";
import YearSelect from "../Indicator/YearSelect";
import IndicatorSelect from "../Indicator/IndicatorSelect";
import RegionsSelect from "./RegionsSelect";
import BarChart from "./BarChart";
import { PriceQueriesContext } from "../ConsumerPriceIndex";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Download from "./Download/Download";
import monthes from "../Indicator/monthes";

const Histogram = () => {
  const { groceryData, regData, indicator, indicatorMonth } =
    useContext(PriceQueriesContext);
  const [selectedRegId, setSelectedRegId] = useState(null);
  const { language } = useParams();
  const [selecetedMonth, setSelectedMonth] = useState(
    monthes[indicatorMonth][`name_${language}`],
  );

  useEffect(() => {
    setSelectedMonth(monthes[indicatorMonth][`name_${language}`]);
  }, [indicatorMonth, language]);

  const selectedRegion = regData?.find(
    (reg) => reg.web_reg_id === selectedRegId,
  );

  const selectedRegionName = selectedRegion?.[`name_${language}`];

  const filteredGroceries = selectedRegId
    ? groceryData?.filter(
        (grocery) => grocery.web_munic_id === selectedRegId,
      ) || []
    : [];

  return (
    <div className="price-indicator">
      <div className="container">
        <IndicatorSelect />
      </div>
      <div
        className="container"
        style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <RegionsSelect
          selectedRegId={selectedRegId}
          setSelectedRegId={setSelectedRegId}
        />
        <YearSelect />
        <MonthesSelect />
      </div>

      {groceryData && selectedRegId && (
        <div
          className="container"
          style={{ width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: "14px" }}>{indicator} (%) </p>
        </div>
      )}

      {(!filteredGroceries || filteredGroceries.length === 0) && (
        <div
          style={{
            padding: "5px",
            textAlign: "center",
            color: "red",
            fontSize: "14px",
          }}
          className="container">
          <p>
            {language === "en"
              ? "No region selected."
              : "არ არის რეგიონი არჩეული"}
          </p>
        </div>
      )}

      {(!filteredGroceries || filteredGroceries.length > 0) && (
        <div
          className="container"
          style={{ width: "100%", position: "relative" }}>
          <Download
            data={filteredGroceries}
            selectedRegionName={selectedRegionName}
            selecetedMonth={selecetedMonth}
          />
          <BarChart
            region={selectedRegionName}
            filteredGroceries={filteredGroceries}
          />
        </div>
      )}
    </div>
  );
};

export default Histogram;
