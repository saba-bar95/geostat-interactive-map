const getStyle = (feature) => {
  const id = +feature.id;

  if (id === 48 || id === 12) {
    return {
      color: "red",
      weight: 2,
      fillColor: "rgba(255, 0, 0, 0.5)",
      fillOpacity: 0.5,
      dashArray: "5, 5",
    };
  }
  return {
    color: "blue",
    weight: 1,
    fillColor: "lightblue",
    fillOpacity: 0.5,
  };
};

export default getStyle;
