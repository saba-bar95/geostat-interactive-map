import YearsSelect from "../YearsSelect";
import IndicatorsSelect from "../IndicatorsSelect";

const BusinessDiagram = () => {
  return (
    <div className="business-indicator">
      <div className="container">
        <IndicatorsSelect />
      </div>
      <div className="container">
        <YearsSelect />
      </div>
    </div>
  );
};

export default BusinessDiagram;
