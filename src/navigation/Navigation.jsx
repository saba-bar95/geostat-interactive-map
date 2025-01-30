import "./Navigation.scss";
import { useState } from "react";
import queries from "./queries";

const Navigation = () => {
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [selectedLink, setSelectedLink] = useState(null);

  // console.log(selectedQuery);

  console.log(selectedLink);

  const handleSelectQuery = (el) => {
    setSelectedQuery(el);
  };

  const handleSelectLink = (el) => {
    console.log(el);
    setSelectedLink(el);
    if (selectedLink && el.href === selectedLink.href) setSelectedLink(null);
  };

  const closeSidebar = () => {
    setSelectedLink(null);
  };

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
                }>
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
                        console.log(el);
                        handleSelectQuery(el);
                      }}>
                      {el.title}
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
