const getStyle = (feature, zoomLevel, type) => {
  const id = +feature.id;

  if (zoomLevel > 8 && type === "municipality") {
    return {
      color: "gray",
      weight: 2,
      fillOpacity: 0.3,
      fillColor: "rgb(216, 242, 237)",
    };
  }

  if (zoomLevel > 8 && type === "region") {
    if (id === 48 || id === 12) {
      return {
        color: "red",
        weight: 3,
        fillColor: "rgba(255, 0, 0, 0.5)",
        fillOpacity: 0.5,
      };
    }
    return {
      color: "#191970",
      fillColor: "#78716c",
      weight: 4,
      fillOpacity: 0,
    };
  }

  if (zoomLevel <= 8 && type === "region") {
    if (id === 48 || id === 12) {
      return {
        color: "red",
        weight: 3,
        fillColor: "rgba(255, 0, 0, 0.5)",
        fillOpacity: 0.5,
        dashArray: "5, 5",
      };
    }
    return {
      color: "#78716c",
      weight: 3,
      fillColor: "#154f4a",
      fillOpacity: 0.5,
    };
  }
};

export default getStyle;
