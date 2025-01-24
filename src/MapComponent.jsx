import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  LayersControl,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { point, divIcon } from "leaflet";
import regions from "./assets/regions";

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

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 4,
        });
      },
      mouseout: () => {
        layer.setStyle(getStyle(feature));
      },
    });
  };

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

  return (
    <>
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}>
        <LayersControl>
          <LayersControl.BaseLayer checked name="Google Terrain">
            <TileLayer
              attribution='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>'
              url="https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
            <LayersControl.BaseLayer name="Google Street">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>'
                url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Satellite">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>'
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Google Hybrid">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>'
                url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl.BaseLayer>
        </LayersControl>
        <MarkerClusterGroup iconCreateFunction={createCustomClusterIcon}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode}>
              <Popup>{marker.popupText}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {Object.entries(regions).map(([key, value]) => {
          return (
            <GeoJSON
              key={key}
              data={value}
              style={getStyle(value)}
              onEachFeature={onEachFeature} // Attach event handlers
            />
          );
        })}
      </MapContainer>
    </>
  );
};

export default MapComponent;
