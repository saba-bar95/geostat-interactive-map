import { useContext } from "react";
import { QueriesContext } from "../../App";
import BusinessIndicator from "./Contexts/BusinessStatistics/Indicator/BusinessIndicator";
import BusinessDiagram from "./Contexts/BusinessStatistics/BusinessDiagram/BusinessDiagram";
import BusinessHistogram from "./Contexts/BusinessStatistics/BusinessHistogram/BusinessHistogram";
import FindBusinessEntity from "./Contexts/BusinessStatistics/FindBusinessEntity/FindBusinessEntity";

const componentMap = {
  home: BusinessIndicator,
  pie: BusinessDiagram,
  bar: BusinessHistogram,
  gis: FindBusinessEntity,
};

const Context = () => {
  const { selectedQuery, selectedLink } = useContext(QueriesContext);

  if (selectedQuery.title !== "ბიზნეს სტატისტიკა") {
    return null; // or some fallback component
  }

  const ComponentToRender = componentMap[selectedLink.href];

  return ComponentToRender ? <ComponentToRender /> : null; // or some fallback component
};

export default Context;
