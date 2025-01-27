import { point, divIcon } from "leaflet";

const createCustomClusterIcon = (cluster) => {
  const childCount = cluster.getChildCount();
  let backgroundColor;

  if (childCount < 10) {
    backgroundColor = "rgba(110, 204, 57, 0.9)";
  } else if (childCount >= 10 && childCount < 100) {
    backgroundColor = "rgba(240, 194, 12, 0.9)";
  } else {
    backgroundColor = "rgba(241, 128, 23, 0.9)";
  }

  return new divIcon({
    html: `<div class="cluster-icon" style="background-color: ${backgroundColor};">${childCount}</div>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export default createCustomClusterIcon;
