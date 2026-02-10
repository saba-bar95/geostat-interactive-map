import "./ColorBox.scss";
import { useContext } from "react";
import { PriceQueriesContext } from "../ConsumerPriceIndex";
import styled from "styled-components";
import { useParams } from "react-router";

const Span = styled.span`
  background-color: ${(props) => props.$bgColor || "red"};
  width: 10px;
  height: 10px;
  display: block;
`;

const ColorBox = () => {
  const { language } = useParams();
  const { indicatorInfo } = useContext(PriceQueriesContext);

  // Get all paragraph keys dynamically
  const paraKeys = Object.keys(indicatorInfo)
    .filter((key) => key.includes("para"))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  const renderParaText = (paraData) => {
    const { num } = paraData;

    if (Array.isArray(num)) {
      if (num.length === 1) {
        // For cases like "6para" with only one number
        return `${num[0]} >`;
      }
      // For ranges like [-4, -2]
      return `${num[0]} – ${num[1]}`;
    }

    // For single numbers like "1para"
    return `< ${num}`;
  };

  return (
    <div className="colorbox-container">
      <h1>{indicatorInfo[`measurement_${language}`]}</h1>
      <div className="para-container">
        {paraKeys.map((key) => (
          <p key={key}>
            <Span $bgColor={indicatorInfo[key].color}></Span>
            {renderParaText(indicatorInfo[key])}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ColorBox;
