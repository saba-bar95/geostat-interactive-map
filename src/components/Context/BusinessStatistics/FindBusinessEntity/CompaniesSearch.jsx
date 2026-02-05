import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { QueriesContext } from "../BusinessStatistics";
import "./CompaniesSearch.scss";

const CompaniesSearch = () => {
  const { language } = useParams();
  const {
    setCompaniesWithNames,
    filteredCompanies,
    setFilteredCompanies,
    setSelectedCompany,
  } = useContext(QueriesContext);

  const [searchValue, setSearchValue] = useState("");
  const [hasSelected, setHasSelected] = useState(false); // ✅ track if a company was chosen
  const text = language === "en" ? "search..." : "მოძებნე...";

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue === "") {
        setFilteredCompanies([]);
        setHasSelected(false); // reset when input is cleared
      } else {
        setCompaniesWithNames(searchValue);
        setHasSelected(false); // reset when typing again
      }
    }, 400); // wait 400ms after typing
    return () => clearTimeout(handler);
  }, [searchValue, setCompaniesWithNames, setFilteredCompanies]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setSelectedCompany(null); // reset when typing again
  };

  const handleCompanyClick = (company) => {
    if (company.X && company.Y) {
      setSelectedCompany(company);
      setFilteredCompanies([]); // ✅ clear dropdown
      setSearchValue(company.Full_Name); // ✅ put name in input
      setHasSelected(true); // ✅ hide dropdown after selection
    } else {
      alert(
        language === "en"
          ? "Location not found for this company."
          : "ამ კომპანიის ლოკაცია ვერ მოიძებნა.",
      );
    }
  };

  return (
    <div className="companies-search-container">
      <input
        style={{ width: "100%" }}
        id="search"
        type="search"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={text}
      />
      {!hasSelected && filteredCompanies && filteredCompanies.length > 0 && (
        <div className="companies-wrapper">
          {filteredCompanies.map((company, index) => (
            <p
              key={index}
              onClick={() => handleCompanyClick(company)}
              style={{ cursor: "pointer" }}>
              {company.Full_Name} ({company.Legal_Code})
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesSearch;
