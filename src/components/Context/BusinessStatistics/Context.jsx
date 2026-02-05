import { useContext } from "react";
import { QueriesContext } from "./BusinessStatistics";
import Indicator from "./Indicator/Indicator";
import Diagram from "./Diagram/Diagram";
import Histogram from "./Histogram/Histogram";
import FindBusinessEntity from "./FindBusinessEntity/FindBusinessEntity";

const componentMap = {
  home: Indicator,
  pie: Diagram,
  bar: Histogram,
  gis: FindBusinessEntity,
};

const Context = () => {
  const { selectedLink } = useContext(QueriesContext);
  const ComponentToRender = componentMap[selectedLink.href];

  return ComponentToRender ? <ComponentToRender /> : null; // or some fallback component
};

export default Context;
