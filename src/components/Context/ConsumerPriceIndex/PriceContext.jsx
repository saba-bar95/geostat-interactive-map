import { useContext } from "react";
import { PriceQueriesContext } from "./ConsumerPriceIndex";
import Indicator from "./Indicator/Indicator";
import Histogram from "./Histogram/Histogram";
import Diagram from "./Diagram/Diagram";

const componentMap = {
  home: Indicator,
  bar: Histogram,
  pie: Diagram,
};

const PriceContext = () => {
  const { selectedLink } = useContext(PriceQueriesContext);
  const ComponentToRender = componentMap[selectedLink.href];

  return ComponentToRender ? <ComponentToRender /> : null; // or some fallback component
};

export default PriceContext;
