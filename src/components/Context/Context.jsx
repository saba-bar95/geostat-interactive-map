import { useContext } from "react";
import { QueriesContext } from "../../App";
import BusinessIndicator from "./Contexts/BusinessStatistics/Indicator/BusinessIndicator";
import BusinessDiagram from "./Contexts/BusinessStatistics/BusinessDiagram/BusinessDiagram";
import BusinessHistogram from "./Contexts/BusinessStatistics/BusinessHistogram/BusinessHistogram";
import FindBusinessEntity from "./Contexts/BusinessStatistics/FindBusinessEntity/FindBusinessEntity";
import queries from "../Navigation/queries";
import { useParams } from "react-router";

const componentMap = {
  home: BusinessIndicator,
  pie: BusinessDiagram,
  bar: BusinessHistogram,
  gis: FindBusinessEntity,
};

const Context = () => {
  const { selectedQuery, selectedLink } = useContext(QueriesContext);

  const { language } = useParams();

  if (selectedQuery[`title_${language}`] !== queries[0][`title_${language}`]) {
    return null; // or some fallback component
  }

  const ComponentToRender = componentMap[selectedLink.href];

  return ComponentToRender ? <ComponentToRender /> : null; // or some fallback component
};

export default Context;
