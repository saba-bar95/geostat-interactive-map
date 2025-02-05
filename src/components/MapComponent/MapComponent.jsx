import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  LayersControl,
  GeoJSON,
} from "react-leaflet";
import { useState, useContext } from "react";
import "leaflet/dist/leaflet.css";
import "./MapComponent.scss";
import MarkerClusterGroup from "react-leaflet-markercluster";
import regions from "../../coordinates/regions";
import municipalities from "../../coordinates/municipalities";
import getStyle from "../../functions/getStyle";
import onEachFeature from "../../functions/onEachFeature";
import createCustomClusterIcon from "../../functions/createCustomClusterIcon";
import MapEventsHandler from "../../functions/MapEventsHandler";
import markers from "../../coordinates/markers";
import { QueriesContext } from "../../App";

const MapComponent = () => {
  const [zoomLevel, setZoomLevel] = useState(8);
  const center = [41.9, 43.9];

  const { regData, munData, indicator, indicatorYear } =
    useContext(QueriesContext);

  return (
    <>
      {regData && (
        <MapContainer center={center} zoom={8} zoomControl={false}>
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
            const region = regData.find(
              (region) => region.region_id === value.id
            );
            const regionNumber = region ? region[`w_${indicatorYear}`] : "N/A"; // Default to "N/A" if not found
            return (
              <GeoJSON
                key={key}
                data={value}
                style={getStyle(value, zoomLevel, "region")}
                onEachFeature={(feature, layer) => {
                  onEachFeature(feature, layer);
                }}>
                <Popup>
                  <p className="popup-para">{key}</p>
                  {value.id !== "12" && value.id !== "48" && (
                    <p className="popup-para">{indicator}</p>
                  )}
                  {value.id !== "12" && value.id !== "48" && (
                    <p>{regionNumber} (მლნ. ლარი)</p>
                  )}
                </Popup>
              </GeoJSON>
            );
          })}
          {zoomLevel > 8 &&
            municipalities.features.map((el) => {
              const municipality = munData.find(
                (mun) => mun.municipal_ === el.properties.MUNICIPAL1
              );
              const munNumber = municipality
                ? municipality[`w_${indicatorYear}`]
                : "N/A";

              return (
                <GeoJSON
                  key={el.properties.NAME_GE}
                  data={el}
                  style={getStyle(el, zoomLevel, "municipality")}
                  onEachFeature={(feature, layer) => {
                    onEachFeature(feature, layer);
                  }}>
                  <Popup>
                    <p className="popup-para">{el.properties.NAME_SYLFA}</p>
                    <p className="popup-para">{indicator}</p>
                    <p>{munNumber} (მლნ. ლარი)</p>
                  </Popup>
                </GeoJSON>
              );
            })}
          <MapEventsHandler setZoomLevel={setZoomLevel} />
        </MapContainer>
      )}
    </>
  );
};

export default MapComponent;
