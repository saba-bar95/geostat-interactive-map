import "./Navigation.scss";
import { useContext } from "react";
import queries from "./queries";
import { QueriesContext } from "../../App";
import Context from "../Context/Context";

const Navigation = () => {
  const {
    selectedQuery,
    selectedLink,
    handleSelectQuery,
    handleSelectLink,
    closeSidebar,
  } = useContext(QueriesContext);

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
                  selectedLink && selectedLink.name === el.name
                    ? "selected"
                    : ""
                }
                title={el.name}>
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
                  ? `დარგი - ${selectedLink.name}`
                  : selectedLink.name}
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
                  el.title !== selectedQuery.title ? (
                    <li
                      key={i}
                      onClick={() => {
                        handleSelectQuery(el);
                        handleSelectLink(el.links[0]);
                      }}>
                      {el.title}
                    </li>
                  ) : null
                )}
              </ul>
            )}
            {selectedLink.href !== "menu" && <Context />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
