import YearsSelect from "../YearsSelect";
import IndicatorsSelect from "../IndicatorsSelect";
import { useContext } from "react";
import { QueriesContext } from "../../../../../App";
import { useParams } from "react-router";
import PieChart from "./PieChart";

const BusinessDiagram = () => {
  const { regData, selectedQuery, indicator, indicatorInfo, indicatorYear } =
    useContext(QueriesContext);

  const { language } = useParams();

  return (
    <div className="business-indicator">
      <div className="container">
        <IndicatorsSelect />
      </div>
      <div className="container">
        <YearsSelect />
      </div>
      <div className="diagram-header">
        <p className="diagram-p">
          {selectedQuery[`title_${language}`]}: {indicator} (
          {indicatorInfo[`measurement_${language}`]})
        </p>
        <p className="diagram-p">
          {language === "en" ? "Year" : "წელი"}{" "}
          <span className="diagram-span">{indicatorYear}</span>
        </p>
      </div>
      <PieChart data={regData} year={indicatorYear} />
    </div>
  );
};

export default BusinessDiagram;
