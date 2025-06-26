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
import getEmployed from "../../../../../functions/fetchFunctions/getEmployed";
import getEmployees from "../../../../../functions/fetchFunctions/getEmployees";
import getPayGender from "../../../../../functions/fetchFunctions/getPayGender";
import { useParams } from "react-router";

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

  const { language } = useParams();

  console.log(indicator);

  const indicatorInfo = numIntervals[indicator].measurement;
  const isByGender =
    indicator === indicators[12] || indicator === indicators[11];
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [loading, setLoading] = useState(false);
  let sortedMuns;

  const sortedByGender = regData
    .filter(
      (region) =>
        region[`F_${indicatorYear}`] !== 0 &&
        region[`F_${indicatorYear}`] !== null
    )
    .sort((a, b) => b[`F_${indicatorYear}`] - a[`F_${indicatorYear}`]);

  const sortedRegions = regData
    .filter((region) => region[`w_${indicatorYear}`] !== null) // Exclude regions with null values
    .sort((a, b) => b[`w_${indicatorYear}`] - a[`w_${indicatorYear}`]); // Sort in descending order

  const handleIndicatorChanger = (e) => {
    setLoading(true);
    setIndicator(e.target.value);
  };

  const handleYearChange = (e) => {
    const year = e.target.value.split(" ")[0];
    setLoading(true);
    setIndicatorYear(year);
  };

  useEffect(() => {
    const fetchPayGender = async (type, year) => {
      const fetchedData = await getPayGender(type, year); // For "შრომის ანაზღაურება სქესის მიხედვით"
      if (fetchedData) {
        setRegData(fetchedData);
      }
      setLoading(false);
    };

    const fetchEmployeesData = async (type, year) => {
      const fetchedData = await getEmployees(type, year); // For "დაქირავებულთა ღირებულება"
      if (fetchedData) {
        if (type === "Reg") {
          setRegData(fetchedData);
        } else {
          setMunData(fetchedData);
        }
      }
      setLoading(false);
    };

    const fetchEmployedData = async (type, year) => {
      const fetchedData = await getEmployed(type, year); // For "დაქირავებულთა ღირებულება"
      if (fetchedData) {
        if (type === "Reg") {
          setRegData(fetchedData);
        } else {
          setMunData(fetchedData);
        }
      }
      setLoading(false);
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
      setLoading(false);
    };

    const fetchTurnoverData = async (type, year) => {
      const fetchedData = await getBrunva(type, year); // For "ბრუნვა"
      if (fetchedData) {
        if (type === "Reg") {
          setRegData(fetchedData);
        } else {
          setMunData(fetchedData);
        }
      }
      setLoading(false);
    };

    if (indicator === indicators[12]) {
      fetchPayGender(indicatorYear);
      setMunData(null);
    }

    if (indicator === indicators[3]) {
      if (indicatorYear > 2013) {
        fetchEmployeesData("Mun", indicatorYear);
      }
      fetchEmployeesData("Reg", indicatorYear);
    }

    if (indicator === indicators[2]) {
      if (indicatorYear > 2013) {
        fetchEmployedData("Mun", indicatorYear);
      }
      fetchEmployedData("Reg", indicatorYear);
    }

    if (indicator === indicators[1]) {
      if (indicatorYear > 2013) {
        fetchValAddedData("Mun", indicatorYear);
      }
      fetchValAddedData("", indicatorYear);
    }

    if (indicator === indicators[0]) {
      if (indicatorYear > 2013) {
        fetchTurnoverData("Mun", indicatorYear);
      }
      fetchTurnoverData("Reg", indicatorYear);
    }
  }, [indicatorYear, setMunData, setRegData, indicator]);

  return (
    <div className="business-indicator">
      <div className="container">
        <select
          name="indicatorSelect"
          id="indicator"
          onChange={handleIndicatorChanger}>
          {indicators[language].map((el) => {
            return <option key={el}>{el}</option>;
          })}
        </select>
      </div>
      <div className="container">
        <select name="yearSelect" id="year" onChange={handleYearChange}>
          {years.map((el) => {
            return (
              <option
                key={el}
                selected={el === 2022}
                disabled={
                  (indicator === indicators[1] || isByGender) && el < 2007
                }>
                {el} წელი
              </option>
            );
          })}
        </select>
      </div>

      {!loading && isByGender && (
        <div className="container regions-container">
          <div className="header header-gender">
            <p>რეგიონი</p>
            <div className="genders">
              <p>ქალი</p>
              <p>კაცი</p>
            </div>
          </div>
          <div className="regions">
            {sortedByGender.map((region) => {
              const regId = region.REGION_ID;

              return (
                <div className="paras" key={regId}>
                  {region.NAME_GE}
                  <div className="numbers">
                    <p>
                      {typeof region[`F_${indicatorYear}`] === "number"
                        ? region[`F_${indicatorYear}`].toFixed(1)
                        : region[`F_${indicatorYear}`]}
                    </p>
                    <p>
                      {typeof region[`M_${indicatorYear}`] === "number"
                        ? region[`M_${indicatorYear}`].toFixed(1)
                        : region[`M_${indicatorYear}`]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!loading && !isByGender && (
        <div className="container regions-container">
          <div className="header">
            <p>რეგიონი</p>
            <p>{indicatorInfo}</p>
          </div>
          <div className="regions">
            {sortedRegions.map((region) => {
              const regId = region.region_id;
              if (munData) {
                const muns = munData.filter((mun) => {
                  const munId = mun.municipal_ ? mun.municipal_.slice(0, 2) : 0;
                  return munId === regId;
                });
                sortedMuns = muns
                  .filter((mun) => mun[`w_${indicatorYear}`] !== null)
                  .sort(
                    (a, b) => b[`w_${indicatorYear}`] - a[`w_${indicatorYear}`]
                  );
              }

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
                          {regId === "11" ? null : selectedRegionId ===
                            regId ? (
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
                  {indicatorYear > 2013 &&
                    selectedRegionId === regId &&
                    regId !== "11" && (
                      <div className="mun-container">
                        {sortedMuns.map((mun) => {
                          const name = municipalities.features
                            .filter(
                              (mun1) =>
                                mun1.properties.MUNICIPAL1 === mun.municipal_
                            )
                            .map((mun2) => mun2.properties.NAME_SYLFA);

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
      )}
    </div>
  );
};

export default BusinessIndicator;
