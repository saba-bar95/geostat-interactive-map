const onEachFeature = (feature, layer) => {
  layer.on({
    mouseover: (e) => {
      e.target.setStyle({
        weight: 5,
        fillOpacity: 0.7,
      });
    },
    mouseout: (e) => {
      e.target.setStyle({
        weight: 3,
        fillOpacity: 0.5,
      });
    },
  });
};

export default onEachFeature;
