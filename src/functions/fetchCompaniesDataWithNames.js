import { brApi } from "../BackEndUrl";

const fetchCompaniesDataWithNames = async (city, name, legalForm, activity) => {
  if (!city || !name) {
    throw new Error("City and name are required");
  }

  const params = new URLSearchParams();

  params.append("city", city);
  params.append("search", name);

  if (legalForm) {
    params.append("legalForm", legalForm);
  }
  if (activity) {
    params.append("activity", activity);
  }

  const url = `${brApi}/api/gis-search/?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export default fetchCompaniesDataWithNames;
