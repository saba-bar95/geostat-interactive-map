import { brApi } from "../BackEndUrl";

const fetchActivities = async (language) => {
  let response;
  if (language === "ge") {
    response = await fetch(`${brApi}/api/activities/gis`);
  } else {
    response = await fetch(`${brApi}/api/activities/gis?lang=en`);
  }

  const data = await response.json();
  return data;
};

export default fetchActivities;
