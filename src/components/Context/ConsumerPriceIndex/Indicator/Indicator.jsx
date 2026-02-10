import AngleRight from "./AngleRight";
import AngleDown from "./AngleDown";
import IndicatorSelect from "./IndicatorSelect";
import YearSelect from "./YearSelect";
import { useParams } from "react-router";
import { useContext, useState } from "react";
import { PriceQueriesContext } from "../ConsumerPriceIndex";
import "./Indicator.scss";
import MonthesSelect from "./MonthesSelect";

const Indicator = () => {
  const { language } = useParams();
  const { regData, groceryData } = useContext(PriceQueriesContext);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [isMunOpen, setIsMunOpen] = useState(null);

  return (
    <div className="price-indicator">
      <div className="container" style={{ width: "100%" }}>
        <IndicatorSelect />
      </div>
      <div className="container" style={{ display: "flex", gap: "10px" }}>
        <YearSelect />
        <MonthesSelect />
      </div>

      <div className="container regions-container">
        <div className="header">
          <p>{language === "en" ? "Region" : "რეგიონი"}</p>
          <p>(%)</p>
        </div>
        <div className="regions">
          {regData &&
            regData.map((region) => {
              const regId = region.web_reg_id;

              const regionGroceries =
                groceryData?.filter(
                  (grocery) => grocery.web_munic_id === regId,
                ) || [];

              return (
                <div className="wrapper" key={region.OGR_FID}>
                  <div
                    className="paras"
                    onClick={() => {
                      if (regId === selectedRegionId) setSelectedRegionId(null);
                      else setSelectedRegionId(regId);
                      setIsMunOpen((prev) => (prev === regId ? null : regId));
                    }}>
                    <p>
                      {selectedRegionId === regId ? (
                        <AngleDown />
                      ) : (
                        <AngleRight />
                      )}
                      {region[`name_${language}`]}
                    </p>

                    <p>{region.value.toFixed(1)}</p>
                  </div>

                  {isMunOpen === regId && (
                    <div className="mun-container">
                      {regionGroceries.length > 0 ? (
                        regionGroceries.map((grocery) => {
                          // Validate each grocery item
                          const hasValidName = grocery[`name_${language}`];
                          const hasValidValue =
                            grocery.value !== null &&
                            grocery.value !== undefined &&
                            !isNaN(grocery.value);

                          // Skip invalid items
                          if (!hasValidName || !hasValidValue) {
                            return null;
                          }

                          return (
                            <div
                              key={grocery.OGR_FID}
                              className="mun-paras"
                              style={{ gap: "15px" }}>
                              <p style={{ width: "300px" }}>
                                {grocery[`name_${language}`]}
                              </p>
                              <p>{grocery.value.toFixed(1)}</p>
                            </div>
                          );
                        })
                      ) : (
                        <p style={{ padding: "10px", fontStyle: "italic" }}>
                          {language === "en"
                            ? "No data available"
                            : "მონაცემები არ არის"}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Indicator;
