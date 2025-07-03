import "./ColorBox.scss";
import { useContext } from "react";
import { QueriesContext } from "../../App";
import styled from "styled-components";
import { useParams } from "react-router";

const Span = styled.span`
  background-color: ${(props) =>
    props.$bgColor || "red"}; // Default to red if no color is provided
  width: 10px;
  height: 10px;
  display: block;
`;

const ColorBox = () => {
  const { language } = useParams();
  const { indicator, indicatorInfo } = useContext(QueriesContext);

  return (
    <div className="colorbox-container">
      <h1>
        {indicator} ({indicatorInfo[`measurement_${language}`]})
      </h1>
      <div className="para-container">
        <p>
          <Span $bgColor={indicatorInfo["1para"].color}></Span>
          &lt; {indicatorInfo["1para"].num}
        </p>
        <p>
          <Span $bgColor={indicatorInfo["2para"].color}></Span>
          {indicatorInfo["2para"].num[0]} - {indicatorInfo["2para"].num[1]}
        </p>
        <p>
          <Span $bgColor={indicatorInfo["3para"].color}></Span>
          {indicatorInfo["3para"].num[0]} - {indicatorInfo["3para"].num[1]}
        </p>
        <p>
          <Span $bgColor={indicatorInfo["4para"].color}></Span>
          {indicatorInfo["4para"].num[0]} - {indicatorInfo["4para"].num[1]}
        </p>
        <p>
          <Span $bgColor={indicatorInfo["5para"].color}></Span>
          {indicatorInfo["5para"].num} ≥
        </p>
      </div>
    </div>
  );
};

export default ColorBox;
