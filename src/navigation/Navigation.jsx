import "./Navigation.scss";
import { useState } from "react";

const Navigation = () => {
  const [selected, setSelected] = useState(null);
  const [sidebarTitle, setSidebarTitle] = useState(""); // State to hold the sidebar title

  const handleSelect = (index, title) => {
    if (selected === index) {
      // If the clicked item is already selected, close the sidebar
      setSelected(null);
      setSidebarTitle(""); // Clear the sidebar title
    } else {
      // Otherwise, set the selected item and update the sidebar title
      setSelected(index);
      setSidebarTitle(title);
    }
  };

  const titles = [
    "დარგი - ბიზნეს სტატისტიკა",
    "მაჩვენებელი",
    "დიაგრამა",
    "ჰისტოგრამა",
    "ძიება",
  ];

  return (
    <div className="navigation">
      <div className="navigation-container">
        <ul role="tablist">
          {["#menu", "#home", "#pie", "#bar", "#gis"].map((href, index) => (
            <li
              key={index}
              className={selected === index ? "selected" : ""}
              onClick={() => {
                handleSelect(index, titles[index]); // Pass the title to handleSelect
              }}>
              <a role="tab" title={titles[index]}>
                <i
                  className={`fa fa-${
                    href === "#menu"
                      ? "sliders"
                      : href === "#home"
                      ? "table"
                      : href === "#pie"
                      ? "pie-chart"
                      : href === "#bar"
                      ? "bar-chart"
                      : "search"
                  }`}></i>
              </a>
            </li>
          ))}
        </ul>
        {/* Sidebar to display the title */}
        {selected !== null && ( // Check if selected is not null
          <div className="sidebar">
            <h2>{sidebarTitle}</h2> {/* Show the title if it exists */}
            <span className="sidebar-close">
              <i className="fa fa-caret-left"></i>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
