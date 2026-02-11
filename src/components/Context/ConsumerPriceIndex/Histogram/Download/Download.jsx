/* eslint-disable react/prop-types */
import { useParams } from "react-router";
import { useState, useContext } from "react";
import "./Download.scss";
import downloadJPG from "./downloadJPG";
import downloadHistogramExcel from "./downloadHistogramExcel";
import downloadHistogramPDF from "./downloadHistogramPDF";
import { PriceQueriesContext } from "../../ConsumerPriceIndex";

const Download = ({ data, selectedRegionName, selecetedMonth }) => {
  const downloadClasses = "download-container hist-download-container-pages";

  const formats = ["jpg", "pdf", "xlsx"];
  const [showWrapper, setShowWrapper] = useState(false);
  const { language } = useParams();

  const { indicator, indicatorYear } = useContext(PriceQueriesContext);

  const handleDownload = (event, format) => {
    switch (format) {
      case "jpg":
        downloadJPG(event, indicator, indicatorYear);
        break;
      case "pdf":
        downloadHistogramPDF(
          data,
          indicator,
          indicatorYear,
          selectedRegionName,
          selecetedMonth,
          language,
        );
        break;
      case "xlsx":
        downloadHistogramExcel(
          data,
          indicator,
          indicatorYear,
          selectedRegionName,
          selecetedMonth,
          language,
        );
        break;
      default:
        console.warn("Unknown format:", format);
    }
  };

  return (
    <div className={downloadClasses}>
      <div className="dropdown-container">
        {showWrapper && (
          <div
            className="wrapper"
            onMouseEnter={() => setShowWrapper(true)}
            onMouseLeave={() => setShowWrapper(false)}>
            {formats.map((el) => (
              <div key={el} onClick={(event) => handleDownload(event, el)}>
                <p>{el}</p>
              </div>
            ))}
          </div>
        )}
        <div
          className="download"
          onMouseEnter={() => setShowWrapper(true)}
          onMouseLeave={() => setShowWrapper(false)}>
          <h1>{language === "en" ? "Download" : "გადმოწერა"}</h1>
        </div>
      </div>
      <div className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px">
          <path d="M3,0 L8,0 L8,5 L11,5 L5.5,10 L0,5 L3,5 L03,0" fill="#888" />
          <rect x="0" y="12" width="11" height="2" fill="#888" />
        </svg>
      </div>
    </div>
  );
};

export default Download;
