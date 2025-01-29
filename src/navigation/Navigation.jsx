import "./Navigation.scss";
import { useState } from "react";

const Navigation = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    console.log(index);
    setSelected(index);
  };

  return (
    <div className="navigation">
      <div className="navigation-container">
        <ul role="tablist">
          {["#menu", "#home", "#pie", "#bar", "#gis"].map((href, index) => (
            <li
              key={index}
              className={selected === index ? "selected" : ""}
              onClick={() => handleSelect(index)}>
              <a
                role="tab"
                title={
                  href === "#menu"
                    ? "დარგი - ფასების სტატისტიკა"
                    : href === "#home"
                    ? "მაჩვენებელი"
                    : href === "#pie"
                    ? "დიაგრამა"
                    : href === "#bar"
                    ? "ჰისტოგრამა"
                    : "ძიება"
                }>
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
      </div>
    </div>
  );
};

export default Navigation;
