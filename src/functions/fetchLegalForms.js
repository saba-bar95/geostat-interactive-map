import { brApi } from "../BackEndUrl";

const fetchLegalForms = async (language) => {
  let response;
  if (language === "ge") {
    response = await fetch(`${brApi}/api/legal-forms/gis/1`);
  } else {
    response = await fetch(`${brApi}/api/legal-forms/gis/1?lang=en`);
  }

  const data = await response.json();
  return data;
};

export default fetchLegalForms;
