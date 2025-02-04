const fetchTurnoverData = async (year) => {
  try {
    const response = await fetch(
      `http://192.168.1.27:3001/api/getRegBrunva?year=${year}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.log(error.message);
    return null; // Return null or handle the error as needed
  }
};

export default fetchTurnoverData;
