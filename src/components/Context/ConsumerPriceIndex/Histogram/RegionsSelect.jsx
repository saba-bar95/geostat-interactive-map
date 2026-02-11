/* eslint-disable react/prop-types */
import { useContext } from "react";
import { PriceQueriesContext } from "../ConsumerPriceIndex";
import { useParams } from "react-router";

const RegionsSelect = ({ selectedRegId, setSelectedRegId }) => {
  const { regData } = useContext(PriceQueriesContext);
  const { language } = useParams();

  const handleIndicatorChange = (e) => {
    const value = e.target.value;

    // If empty string (placeholder selected), set to null
    if (value === "") {
      setSelectedRegId(null);
    } else {
      const selectedId = parseInt(value, 10);
      setSelectedRegId(selectedId);
    }
  };

  return (
    <select
      value={selectedRegId ?? ""}
      name="indicatorSelect"
      onChange={handleIndicatorChange}>
      <option value="">
        {language === "en" ? "Select a region" : "აირჩიეთ რეგიონი"}
      </option>
      {regData &&
        regData.map((reg) => (
          <option key={reg.OGR_FID} value={reg.web_reg_id}>
            {reg[`name_${language}`]}
          </option>
        ))}
    </select>
  );
};

export default RegionsSelect;
