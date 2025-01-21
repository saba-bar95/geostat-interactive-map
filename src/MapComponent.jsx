import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { point, divIcon } from "leaflet";

const MapComponent = () => {
  const center = [41.9, 43.9];

  const markers = [
    { geocode: [41.8, 43.8], popupText: "Popup-1" },
    { geocode: [41.5, 43.5], popupText: "Popup-2" },
    { geocode: [41.3, 43.3], popupText: "Popup-3" },
    { geocode: [41.33, 43.33], popupText: "Popup-4" },
    { geocode: [41.35, 43.36], popupText: "Popup-5" },
    { geocode: [42.35, 43.36], popupText: "Popup-6" },
    { geocode: [42.25, 43.56], popupText: "Popup-6" },
    { geocode: [41.95, 43.76], popupText: "Popup-6" },
    { geocode: [41.75, 43.86], popupText: "Popup-6" },
    { geocode: [41.55, 43.36], popupText: "Popup-6" },
    { geocode: [41.69, 44.67], popupText: "Popup-6" },
    { geocode: [41.79, 44.57], popupText: "Popup-6" },
    { geocode: [41.89, 44.47], popupText: "Popup-6" },
    { geocode: [41.99, 44.37], popupText: "Popup-6" },
    { geocode: [42.19, 44.27], popupText: "Popup-6" },
    { geocode: [42.29, 44.17], popupText: "Popup-6" },
    { geocode: [42.39, 43.97], popupText: "Popup-6" },
    { geocode: [42.49, 43.87], popupText: "Popup-6" },
    { geocode: [42.59, 43.77], popupText: "Popup-6" },
    { geocode: [42.69, 43.67], popupText: "Popup-6" },
    { geocode: [42.79, 43.57], popupText: "Popup-6" },
    { geocode: [42.89, 43.47], popupText: "Popup-6" },
  ];

  const createCustomClusterIcon = (cluster) => {
    const childCount = cluster.getChildCount();
    let backgroundColor;

    if (childCount < 10) {
      backgroundColor = "rgba(110, 204, 57, 0.6)";
    } else if (childCount >= 10 && childCount < 100) {
      backgroundColor = "rgba(240, 194, 12, 0.6)";
    } else {
      backgroundColor = "rgba(241, 128, 23, 0.6)";
    }

    console.log(childCount); // Log the child count for debugging

    return new divIcon({
      html: `<div class="cluster-icon" style="background-color: ${backgroundColor};">${childCount}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  return (
    <>
      <MapContainer center={center} zoom={8} scrollWheelZoom={false}>
        <LayersControl>
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <MarkerClusterGroup iconCreateFunction={createCustomClusterIcon}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode}>
              <Popup>{marker.popupText}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

export default MapComponent;
