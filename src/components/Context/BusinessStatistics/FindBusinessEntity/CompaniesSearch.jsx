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
    selectedFindRegionID,
    selectedFormID,
    selectedActivityID,
  } = useContext(QueriesContext);

  const [searchedCompanysName, setSearchedCompanysName] = useState("");
  const [hasSelected, setHasSelected] = useState(false); // ✅ track if a company was chosen
  const text = language === "en" ? "search..." : "მოძებნე...";

  useEffect(() => {
    if (searchedCompanysName === "") {
      setFilteredCompanies([]);
      setHasSelected(false); // reset when input is cleared
    } else {
      setCompaniesWithNames(searchedCompanysName);
      setHasSelected(false); // reset when typing again
    }
  }, [searchedCompanysName, setCompaniesWithNames, setFilteredCompanies]);

  const handleInputChange = (e) => {
    setSearchedCompanysName(e.target.value);
    setSelectedCompany(null); // reset when typing again
  };

  const handleCompanyClick = (company) => {
    if (company.X && company.Y) {
      setSelectedCompany(company);
      setFilteredCompanies([]); // ✅ clear dropdown
      setSearchedCompanysName(company.Full_Name); // ✅ put name in input
      setHasSelected(true); // ✅ hide dropdown after selection
    } else {
      alert(
        language === "en"
          ? "Location not found for this company."
          : "ამ კომპანიის ლოკაცია ვერ მოიძებნა.",
      );
    }
  };

  useEffect(() => {
    setSearchedCompanysName("");
    setFilteredCompanies([]);
  }, [
    selectedFindRegionID,
    setFilteredCompanies,
    selectedFormID,
    selectedActivityID,
  ]);

  return (
    <div className="companies-search-container">
      <input
        style={{ width: "100%" }}
        id="search"
        type="search"
        value={searchedCompanysName}
        onChange={handleInputChange}
        placeholder={text}
      />
      {!hasSelected &&
        searchedCompanysName !== "" &&
        filteredCompanies &&
        filteredCompanies.length > 0 && (
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
