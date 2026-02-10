const fetchPriceGroceryData = async (indicator, year, month) => {
  try {
    const response = await fetch(
      `http://192.168.1.27:5000/api/${indicator}?year=${year}&month=${month}`,
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
