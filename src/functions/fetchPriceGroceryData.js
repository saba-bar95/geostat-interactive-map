import backEndUrl from "../BackEndUrl";

const fetchPriceGroceryData = async (indicator, year, month) => {
  try {
    const response = await fetch(
      `${backEndUrl}/api/${indicator}?year=${year}&month=${month}`,
    );

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

export default fetchPriceGroceryData;
