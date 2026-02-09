const getPriceStyle = (value, regionNumber, regColor) => {
  const id = +value.id;

  if (id === 48 || id === 12) {
    return {
      color: "transparent",
      weight: 3,
      fillColor: "rgba(255, 0, 0, 0.5)",
      fillOpacity: 0.5,
      dashArray: "5, 5",
    };
  }

  if (!regionNumber) {
    return {
      color: "#78716c",
      weight: 3,
      fillColor: "#fff",
      fillOpacity: 3 / 4,
    };
  }

  return {
    color: "#78716c",
    weight: 3,
    fillColor: regColor,
    fillOpacity: 0.5,
  };
};

export default getPriceStyle;
