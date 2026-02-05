import "./Navigation.scss";
import { useContext } from "react";
import queries from "./queries";
import { QueriesContext } from "../Context/BusinessStatistics/BusinessStatistics";
import { PriceQueriesContext } from "../Context/ConsumerPriceIndex/ConsumerPriceIndex";
import Context from "../Context/BusinessStatistics/Context";
import PriceContext from "../Context/ConsumerPriceIndex/PriceContext";
import { useParams, useNavigate } from "react-router-dom";

const Navigation = () => {
  const businessContext = useContext(QueriesContext);
  const priceContext = useContext(PriceQueriesContext);

  // Use whichever context is available
  const context = businessContext || priceContext;

  // Determine which context is active
  const isBusinessContext = !!businessContext;
  const isPriceContext = !!priceContext;

  const {
    selectedQuery,
    selectedLink,
    handleSelectQuery,
    handleSelectLink,
    closeSidebar,
  } = context;

  const { language } = useParams();
  const navigate = useNavigate();

  const field = language === "ge" ? "დარგი" : "Field";

  return (
    <div className="navigation">
      <div className="navigation-container">
        <ul role="tablist">
          {selectedQuery.links.map((el, i) => {
            return (
              <li
                key={i}
                onClick={() => handleSelectLink(el)}
                className={
                  selectedLink &&
                  selectedLink[`name_${language}`] === el[`name_${language}`]
                    ? "selected"
                    : ""
                }
                title={el[`name_${language}`]}>
                <a role="tab">
                  <i
                    className={`fa fa-${
                      el.href === "menu"
                        ? "sliders"
                        : el.href === "home"
                          ? "table"
                          : el.href === "pie"
                            ? "pie-chart"
                            : el.href === "bar"
                              ? "bar-chart"
                              : el.href === "regmun"
                                ? "globe"
                                : "search"
                    }`}></i>
                </a>
              </li>
            );
          })}
        </ul>
        {selectedLink !== null && (
          <div className="sidebar">
            <div className="upper">
              <h2>
                {selectedLink.href === "menu"
                  ? `${field} - ${selectedLink[`name_${language}`]}`
                  : selectedLink[`name_${language}`]}
              </h2>
              <span
                className="sidebar-close"
                onClick={() => {
                  closeSidebar();
                }}>
                <i className="fa fa-caret-left"></i>
              </span>
            </div>
            {selectedLink.href === "menu" && (
              <ul>
                {queries.map((el, i) =>
                  el[`title_${language}`] !==
                  selectedQuery[`title_${language}`] ? (
                    <li
                      key={i}
                      onClick={() => {
                        handleSelectQuery(el);
                        handleSelectLink(el.links[0]);
                        navigate(`/${language}/${el.path}`);
                      }}>
                      {el[`title_${language}`]}
                    </li>
                  ) : null,
                )}
              </ul>
            )}
            {selectedLink.href !== "menu" && (
              <>
                {isBusinessContext && <Context />}
                {isPriceContext && <PriceContext />}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
