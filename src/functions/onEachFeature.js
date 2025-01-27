import getStyle from "./getStyle";

const onEachFeature = (feature, layer, type, zoomLevel) => {
  console.log(zoomLevel, type);

  if (type === "municipality") {
    layer.setStyle(
      getStyle(feature, type, zoomLevel > 8 ? "green" : "lightgreen")
    );
  }

  if (type === "region") {
    layer.setStyle(
      getStyle(feature, type, zoomLevel > 8 ? "red" : "lightcoral")
    );
  }

  layer.on({
    mouseover: (e) => {
      e.target.setStyle({
        weight: 4,
      });
    },
    mouseout: (e) => {
      e.target.setStyle({
        weight: 2,
      });
    },
  });
};

export default onEachFeature;
