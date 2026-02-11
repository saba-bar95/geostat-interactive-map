import backEndUrl from "../BackEndUrl";

const fetchPriceInitialYearAndMonth = async () => {
  try {
    const response = await fetch(`${backEndUrl}/api/reg-wliuri/latest`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default fetchPriceInitialYearAndMonth;
