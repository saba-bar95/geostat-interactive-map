import "./BusinessIndicator.scss";
import years from "./years";
import { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { QueriesContext } from "../../../../../App";
import AngleRight from "./AngleRight";
import AngleDown from "./AngleDown";
import municipalities from "../../../../../coordinates/municipalities";
import fetchData from "../../../../../functions/fetchData";
import fetchPayGender from "../../../../../functions/fetchPayGender";

const BusinessIndicator = () => {
  const {
    setRegData,
    setMunData,
    setIndicatorYear,
    regData,
    munData,
    indicators,
    indicator,
    indicatorInfo,
    indicatorYear,
    setIndicator,
    setIndicatorIndex,
  } = useContext(QueriesContext);

  const { language } = useParams();

  const [isMunOpen, setIsMunOpen] = useState(null);

  const isByGender =
    indicator === indicators[12] || indicator === indicators[11];
  const [selectedRegionId, setSelectedRegionId] = useState(null);
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
    const selected = e.target.value;
    const index = indicators.indexOf(selected);
    setIndicatorIndex(index);
    setIndicator(selected);

    const minYear = getMinValidYear(selected);
    if (indicatorYear < minYear) {
      setIndicatorYear(minYear);
    }
  };

  const getMinValidYear = (indicator) => {
    if (
      indicator === indicators[10] ||
      indicator === indicators[1] ||
      indicator === indicators[2]
    )
      return 2006;

    if (indicator === indicators[11]) return 2005;

    if (
      indicator === indicators[12] ||
      indicator === indicators[11] ||
      indicator === indicators[4] ||
      indicator === indicators[5] ||
      indicator === indicators[7] ||
      indicator === indicators[9]
    ) {
      return 2007;
    }
    return Math.min(...years); // fallback to earliest year
  };

  const handleYearChange = (e) => {
    const year = Number(e.target.value.split(" ")[0]);
    setIndicatorYear(year);
  };

  const indicatorMap = useMemo(
    () => ({
      [indicators[0]]: "Brunva",
      [indicators[1]]: "ValAdded",
      [indicators[2]]: "Employed",
      [indicators[3]]: "Employees",
      [indicators[4]]: "Resale",
      [indicators[5]]: "Investment",
      [indicators[6]]: "ProdVal",
      [indicators[7]]: "Purchases",
      [indicators[8]]: "Remuneration",
      [indicators[9]]: "Costs",
      [indicators[10]]: "IntConsumption",
      [indicators[11]]: "RegEmployeesGender",
      [indicators[12]]: "PayGender",
    }),
    [indicators]
  );

  useEffect(() => {
    const runFetch = async () => {
      const indicatorKey = indicatorMap[indicator];
      if (!indicatorKey) return;

      // Special case for indicator[12] (gender pay)
      if (indicator === indicators[12] || indicator === indicators[11]) {
        const regDataRes = await fetchPayGender(indicatorKey, indicatorYear);
        console.log(regDataRes);
        if (regDataRes) setRegData(regDataRes);
        setMunData(null);
        return;
      }

      const shouldFetchMun = indicatorYear > 2013;
      const regScale = indicator === indicators[1] ? "" : "Reg";

      const [regRes, munRes] = await Promise.all([
        fetchData(indicatorKey, regScale, indicatorYear),
        shouldFetchMun ? fetchData(indicatorKey, "Mun", indicatorYear) : null,
      ]);

      if (regRes) setRegData(regRes);
      if (munRes) setMunData(munRes);
    };

    runFetch();
  }, [
    indicatorYear,
    indicator,
    indicatorMap,
    indicators,
    setRegData,
    setMunData,
  ]);

  return (
    <div className="business-indicator">
      <div className="container">
        <select
          value={indicator}
          name="indicatorSelect"
          id="indicator"
          onChange={handleIndicatorChanger}>
          {indicators.map((el) => {
            return <option key={el}>{el}</option>;
          })}
        </select>
      </div>
      <div className="container">
        <select
          name="yearSelect"
          id="year"
          value={indicatorYear}
          onChange={handleYearChange}>
          {years.map((el) => (
            <option
              key={el}
              value={el}
              disabled={
                (indicator === indicators[11] && el < 2005) ||
                ((indicator === indicators[10] ||
                  indicator === indicators[1] ||
                  indicator === indicators[2]) &&
                  el < 2006) ||
                ((isByGender ||
                  indicator === indicators[4] ||
                  indicator === indicators[5] ||
                  indicator === indicators[7] ||
                  indicator === indicators[9]) &&
                  el < 2007)
              }>
              {el} {language === "en" ? "Year" : "წელი"}
            </option>
          ))}
        </select>
      </div>

      {isByGender && (
        <div className="container regions-container">
          <div className="header header-gender">
            <p>{language === "en" ? "Region" : "რეგიონი"}</p>
            <div className="genders">
              <p>{language === "en" ? "Female" : "ქალი"}</p>
              <p>{language === "en" ? "Male" : "კაცი"}</p>
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

      {!isByGender && (
        <div className="container regions-container">
          <div className="header">
            <p>{language === "en" ? "Region" : "რეგიონი"}</p>
            <p>{indicatorInfo && indicatorInfo[`measurement_${language}`]}</p>
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
                    className={"paras"} // Add conditional class here
                    onClick={() => {
                      if (regId === selectedRegionId) setSelectedRegionId(null);
                      else setSelectedRegionId(regId); // Set the selected region ID
                      setIsMunOpen((prev) => (prev === regId ? null : regId));
                    }}
                    style={
                      indicatorYear > 2013 && regId === "11"
                        ? { marginLeft: "23px" }
                        : undefined
                    }>
                    {region[`w_${indicatorYear}`] > 0 && (
                      <>
                        <p>
                          {regId === "11" ? null : selectedRegionId ===
                            regId ? (
                            <>{indicatorYear > 2013 && <AngleDown />}</>
                          ) : (
                            <>{indicatorYear > 2013 && <AngleRight />}</>
                          )}
                          {region[`name_${language}`]}
                        </p>
                        <p>
                          {typeof region[`w_${indicatorYear}`] === "number"
                            ? region[`w_${indicatorYear}`].toFixed(1)
                            : region[`w_${indicatorYear}`]}
                        </p>
                      </>
                    )}
                  </div>
                  {isMunOpen &&
                    indicatorYear > 2013 &&
                    selectedRegionId === regId &&
                    regId !== "11" && (
                      <div className="mun-container">
                        {sortedMuns
                          .sort((a, b) => b.value - a.value)
                          .map((mun) => {
                            const name = municipalities.features
                              .filter(
                                (mun1) =>
                                  mun1.properties.MUNICIPAL1 === mun.municipal_
                              )
                              .map((mun2) =>
                                language === "en"
                                  ? mun2.properties.NAME_EN
                                  : mun2.properties.NAME_SYLFA
                              );

                            return (
                              <div className="mun-paras" key={mun.municipal_}>
                                <p>{name}</p>
                                <p>
                                  {typeof mun[`w_${indicatorYear}`] === "number"
                                    ? mun[`w_${indicatorYear}`].toFixed(1)
                                    : typeof mun.value === "number"
                                    ? mun.value.toFixed(1)
                                    : "N/A"}
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
