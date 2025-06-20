import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./LanguageChanger.scss";

const LanguageChanger = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState(params.language);

  const languages = ["ge", "en"];

  const toggleLanguage = () => {
    const newLanguage = language === "ge" ? "en" : "ge";
    setLanguage(newLanguage);
    const currentPath = location.pathname.split("/").slice(2).join("/");
    navigate(`/${newLanguage}/${currentPath}`);
  };

  useEffect(() => {
    setLanguage(params.language);
  }, [params.language]);

  return (
    <div className="language-changer">
      {languages.map((el, index) => {
        const isSelected = language === el;
        const isFirst = index === 0;
        const classNames = `${isFirst ? "first" : ""} ${
          isSelected ? "selected" : ""
        }`.trim();

        return (
          <span key={el}>
            <p className={classNames} onClick={() => toggleLanguage()}>
              {el}
            </p>{" "}
            {index < languages.length - 1 && (
              <span className="separator">|</span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default LanguageChanger;
