import "./BusinessIndicator.scss";
import indicators from "./indicators";
import years from "./years";
import { useContext, useEffect, useState } from "react";
import { QueriesContext } from "../../../../../App";
import numIntervals from "../../../../ColorBox/numIntervals";
import AngleRight from "./AngleRight";
import AngleDown from "./AngleDown";
import getBrunva from "../../../../../functions/fetchFunctions/getBrunva";
import getValAdded from "../../../../../functions/fetchFunctions/getValAdded";
import municipalities from "../../../../../coordinates/municipalities";

const BusinessIndicator = () => {
  const {
    setRegData,
    setMunData,
    setIndicator,
    setIndicatorYear,
    regData,
    munData,
    indicator,
    indicatorYear,
  } = useContext(QueriesContext);

  const indicatorInfo = numIntervals[indicator].measurement;

  const [selectedRegionId, setSelectedRegionId] = useState(null);

  const sortedRegions = regData
    .filter((region) => region[`w_${indicatorYear}`] !== null) // Exclude regions with null values
    .sort((a, b) => b[`w_${indicatorYear}`] - a[`w_${indicatorYear}`]); // Sort in descending order

  const handleIndicatorChanger = (e) => {
    setIndicator(e.target.value);
  };

  const handleYearChange = (e) => {
    const year = e.target.value.split(" ")[0];
    setIndicatorYear(year);
  };

  console.log(munData);

  useEffect(() => {
    const fetchTurnoverData = async (type, year) => {
      const fetchedData = await getBrunva(type, year); // For "ბრუნვა"
      if (fetchedData) {
        if (type === "Reg") {
          setRegData(fetchedData);
        } else {
          setMunData(fetchedData);
        }
      }
    };

    const fetchValAddedData = async (type, year) => {
      const fetchedData = await getValAdded(type, year); // For "დამატებული ღირებულება"
      if (fetchedData) {
        if (type === "") {
          setRegData(fetchedData);
        } else {
          setMunData(fetchedData);
        }
      }
    };

    if (indicator === "ბრუნვა") {
      if (indicatorYear > 2013) {
        fetchTurnoverData("Mun", indicatorYear);
      }
      fetchTurnoverData("Reg", indicatorYear);
    }

    if (indicator === "დამატებული ღირებულება") {
      if (indicatorYear > 2013) {
        fetchValAddedData("Mun", indicatorYear);
      }
      fetchValAddedData("", indicatorYear);
    }
  }, [indicatorYear, setMunData, setRegData, indicator]);

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

      <div className="container regions-container">
        <div className="header">
          <p>რეგიონი</p>
          <p>{indicatorInfo}</p>
        </div>
        <div className="regions">
          {sortedRegions.map((region) => {
            const regId = region.region_id;

            const muns = munData.filter((mun) => {
              const munId = mun.municipal_ ? mun.municipal_.slice(0, 2) : 0;
              return munId === regId;
            });

            return (
              <div className="wrapper" key={regId}>
                <div
                  className={`paras ${regId === "11" ? "paras-tbilisi" : ""}`} // Add conditional class here
                  onClick={() => {
                    if (regId === selectedRegionId) setSelectedRegionId(null);
                    else setSelectedRegionId(regId); // Set the selected region ID
                  }}>
                  {region[`w_${indicatorYear}`] > 0 && (
                    <>
                      <p>
                        {regId === "11" ? null : selectedRegionId === regId ? (
                          <>
                            <AngleDown />
                          </>
                        ) : (
                          <>
                            <AngleRight />
                          </>
                        )}
                        {region.name_ge}
                      </p>
                      <p>
                        {typeof region[`w_${indicatorYear}`] === "number"
                          ? region[`w_${indicatorYear}`].toFixed(1)
                          : region[`w_${indicatorYear}`]}
                      </p>
                    </>
                  )}
                </div>
                {selectedRegionId === regId && regId !== "11" && (
                  <div className="mun-container">
                    {muns.map((mun) => {
                      const name = municipalities.features
                        .filter(
                          (mun1) =>
                            mun1.properties.MUNICIPAL1 === mun.municipal_
                        )
                        .map((mun2) => mun2.properties.NAME_SYLFA); // Extract NAME_SYLFA from the filtered results

                      return (
                        <div className="mun-paras" key={mun.municipal_}>
                          <p>{name}</p>
                          <p>
                            {typeof mun[`w_${indicatorYear}`] === "number"
                              ? mun[`w_${indicatorYear}`].toFixed(1)
                              : mun[`w_${indicatorYear}`]}
                          </p>
                        </div>
                      );
                    })}
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

export default BusinessIndicator;
