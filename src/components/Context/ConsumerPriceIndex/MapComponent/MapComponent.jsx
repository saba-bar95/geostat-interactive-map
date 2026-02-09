import {
  MapContainer,
  LayersControl,
  TileLayer,
  GeoJSON,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import regions from "../../../../coordinates/regions";
import { PriceQueriesContext } from "../ConsumerPriceIndex";
import { useContext } from "react";
import { useParams } from "react-router";
import checkNumberRange from "../../../../functions/checkNumberRange";
import getPriceStyle from "../../../../functions/getPriceStyle";

const MapComponent = () => {
  const { regData, indicatorInfo } = useContext(PriceQueriesContext);
  const { language } = useParams();
  const zoomLevel = 8;
  const center = [41.9, 43.9];

  return (
    <MapContainer center={center} zoom={zoomLevel}>
      <LayersControl>
        <LayersControl.BaseLayer checked name="Google Terrain">
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>'
            url="https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>
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
      </LayersControl>

      {regData &&
        Object.entries(regions).map(([key, value]) => {
          const region = regData.find(
            (region) => region.web_reg_id === +value.id,
          );

          const regionNumber = region ? region.value : null;
          const regColor = checkNumberRange(regionNumber, indicatorInfo);

          return (
            <GeoJSON
              key={key}
              data={value}
              style={getPriceStyle(value, regionNumber, regColor)}>
              {typeof regionNumber === "number" && (
                <Popup>
                  <p className="popup-para">{region[`name_${language}`]}</p>
                  <p className="popup-para" style={{ fontWeight: 600 }}>
                    {regionNumber.toFixed(1)}%
                  </p>
                </Popup>
              )}

              {value && +value.id !== 48 && +value.id !== 12 && (
                <Tooltip permanent direction="center" className="region-label">
                  {language === "en"
                    ? value.properties.name_en
                    : value.properties.name}
                </Tooltip>
              )}
            </GeoJSON>
          );
        })}
    </MapContainer>
  );
};

export default MapComponent;
