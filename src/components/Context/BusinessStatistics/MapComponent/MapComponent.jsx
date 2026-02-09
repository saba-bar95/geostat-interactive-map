import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  LayersControl,
  GeoJSON,
  Circle,
} from "react-leaflet";
import {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import "leaflet/dist/leaflet.css";
import "./MapComponent.scss";
import regions from "../../../../coordinates/regions";
import municipalities from "../../../../coordinates/municipalities";
import { useParams } from "react-router";
import getStyle from "../../../../functions/getStyle";
import MapEventsHandler from "../../../../functions/MapEventsHandler";
import { QueriesContext } from "../BusinessStatistics";
import checkNumberRange from "../../../../functions/checkNumberRange";
import MarkerClusterGroup from "react-leaflet-markercluster";
import createCustomClusterIcon from "../../../../functions/createCustomClusterIcon";

const MapComponent = () => {
  const [zoomLevel, setZoomLevel] = useState(8);
  const center = [41.9, 43.9];
  const [selectedMarker, setSelectedMarker] = useState(null);

  const {
    regData,
    munData,
    indicator,
    indicators,
    indicatorYear,
    indicatorInfo,
    companiesData,
    setIsLoadingCompanies,
    selectedCompany,
  } = useContext(QueriesContext);
  const { language } = useParams();

  const mapRef = useRef(null);
  const clusterRef = useRef(null);

  useEffect(() => {
    if (!selectedCompany) {
      setSelectedMarker(null);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (companiesData) {
      if (companiesData.length === 0) {
        setIsLoadingCompanies(false);
        alert(
          language === "en"
            ? "No companies were found with the given parameters."
            : "მოცემული პარამეტრებით კომპანიები ვერ მოიძებნა.",
        );
      }

      requestAnimationFrame(() => {
        setIsLoadingCompanies(false);
      });
    }
  }, [companiesData, setIsLoadingCompanies, language]);

  const markers = useMemo(() => {
    if (!companiesData) return [];

    return companiesData.map((company, index) => {
      const { X, Y, Full_Name, Legal_Code, Activity_2_Name } = company;
      if (typeof X !== "number" || typeof Y !== "number") return null;

      return (
        <Marker
          key={index}
          position={[X, Y]}
          eventHandlers={{
            click: (e) => {
              setSelectedMarker({
                X,
                Y,
                Full_Name,
                Legal_Code,
                Activity_2_Name,
              });
              e.originalEvent.stopPropagation();
            },
          }}
        />
      );
    });
  }, [companiesData]);

  const [regionsReady, setRegionsReady] = useState(false);
  const [munsReady, setMunsReady] = useState(false);

  const regionRefs = useRef({});
  const munRefs = useRef({});

  const setupHoverListeners = useCallback(() => {
    Object.values(regionRefs.current).forEach((geoJsonLayer) => {
      if (geoJsonLayer) {
        geoJsonLayer.eachLayer((layer) => {
          layer.off("mouseover");
          layer.off("mouseout");

          layer.on("mouseover", (e) => {
            if (zoomLevel < 9) {
              e.target.setStyle({
                weight: 5,
                fillOpacity: 0.7,
              });
            }
          });

          layer.on("mouseout", (e) => {
            if (zoomLevel < 9) {
              e.target.setStyle({
                weight: 3,
                fillOpacity: 0.5,
              });
            }
          });
        });
      }
    });
  }, [zoomLevel]);

  const setupMunsHoverListeners = useCallback(() => {
    Object.values(munRefs.current).forEach((geoJsonLayer) => {
      if (geoJsonLayer) {
        geoJsonLayer.eachLayer((layer) => {
          layer.off("mouseover");
          layer.off("mouseout");

          layer.on("mouseover", (e) => {
            if (zoomLevel <= 9) {
              e.target.setStyle({
                weight: 5,
                fillOpacity: 0.7,
              });
            }
          });

          layer.on("mouseout", (e) => {
            if (zoomLevel <= 9) {
              e.target.setStyle({
                weight: 3,
                fillOpacity: 0.5,
              });
            }
          });
        });
      }
    });
  }, [zoomLevel]);

  useEffect(() => {
    if (!regionsReady) return;
    setupHoverListeners();
  }, [regionsReady, setupHoverListeners]);

  useEffect(() => {
    if (!munsReady) return;
    setupMunsHoverListeners();
  }, [munsReady, setupMunsHoverListeners]);

  useEffect(() => {
    setSelectedMarker(null);
  }, [zoomLevel]);

  // Zoom to selected company
  useEffect(() => {
    if (selectedCompany && mapRef.current) {
      const { X, Y } = selectedCompany;
      if (typeof X === "number" && typeof Y === "number") {
        const map = mapRef.current;
        // Zoom to the location with a higher zoom level
        map.setView([X, Y], 15, {
          animate: true,
          duration: 1,
        });

        // Set the selected marker to open the popup
        setTimeout(() => {
          setSelectedMarker({
            X,
            Y,
            Full_Name: selectedCompany.Full_Name,
            Legal_Code: selectedCompany.Legal_Code,
            Activity_2_Name: selectedCompany.Activity_2_Name,
          });
        }, 500);
      }
    }
  }, [selectedCompany]);

  return (
    <>
      <MapContainer center={center} zoom={8} zoomControl={false} ref={mapRef}>
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

        {companiesData && Array.isArray(companiesData) && (
          <MarkerClusterGroup
            iconCreateFunction={createCustomClusterIcon}
            ref={clusterRef}
            zoomToBoundsOnClick={true}
            spiderfyOnMaxZoom={true}>
            {markers}
            {selectedMarker && (
              <Popup
                position={[selectedMarker.X, selectedMarker.Y]}
                color="#33ff00"
                className="selected-company-popup">
                <div
                  style={{
                    backgroundColor: "#f0f8ff",
                    padding: "10px",
                    borderLeft: "4px solid #007bff",
                  }}>
                  <strong style={{ color: "#007bff" }}>
                    {selectedMarker.Full_Name}
                  </strong>

                  <p>{selectedMarker.Activity_2_Name}</p>
                  <a
                    href={`https://br.geostat.ge/?identificationNumber=${selectedMarker.Legal_Code}`}
                    target="_blank"
                    rel="noreferrer">
                    Info
                  </a>
                </div>
              </Popup>
            )}
          </MarkerClusterGroup>
        )}

        {/* Red circle around selected company */}
        {selectedCompany &&
          typeof selectedCompany.X === "number" &&
          typeof selectedCompany.Y === "number" && (
            <Circle
              center={[selectedCompany.X, selectedCompany.Y]}
              radius={50}
              pathOptions={{
                color: "red",
                fillColor: "red",
                fillOpacity: 0.2,
                weight: 3,
              }}
            />
          )}

        {regData &&
          Object.entries(regions).map(([key, value]) => {
            const region = regData.find(
              (region) =>
                +region.region_id === +value.id ||
                region.REGION_ID === +value.id ||
                region.municipal_ === +value.id,
            );

            const regionNumber = region ? region[`w_${indicatorYear}`] : 0;
            const regionFemaleRaw = region[`f_${indicatorYear}`];
            const regionMaleRaw = region[`m_${indicatorYear}`];

            const regionFemaleNumber =
              typeof regionFemaleRaw === "number"
                ? indicator === indicators[11]
                  ? Math.floor(regionFemaleRaw)
                  : parseFloat(regionFemaleRaw.toFixed(1))
                : null;

            const regionMaleNumber =
              typeof regionMaleRaw === "number"
                ? indicator === indicators[11]
                  ? Math.floor(regionMaleRaw)
                  : parseFloat(regionMaleRaw.toFixed(1))
                : null;

            const regColor =
              indicator === indicators[11] || indicator === indicators[12]
                ? checkNumberRange(regionMaleNumber, indicatorInfo)
                : checkNumberRange(regionNumber, indicatorInfo);

            return (
              <GeoJSON
                ref={(el) => {
                  regionRefs.current[key] = el;
                  if (
                    Object.keys(regionRefs.current).length ===
                    Object.entries(regions).length
                  ) {
                    setRegionsReady(true);
                  }
                }}
                key={key}
                data={value}
                style={getStyle(value, zoomLevel, "region", regColor)}>
                <Popup>
                  <p className="popup-para">{region[`name_${language}`]}</p>
                  {typeof regionNumber === "number" &&
                    value.id !== "12" &&
                    value.id !== "48" && (
                      <>
                        <p className="popup-para">{indicator}</p>
                        <p>
                          {regionNumber.toFixed(1)} (
                          {indicatorInfo[`measurement_${language}`]})
                        </p>
                      </>
                    )}
                  {regionFemaleNumber && (
                    <>
                      <p className="popup-para">{region[`NAME_GE`]}</p>
                      <p className="popup-para">{indicator}</p>
                      <p>
                        <span style={{ fontWeight: 900 }}>
                          {language === "en" ? "Female" : "ქალი"}
                        </span>
                        : {regionFemaleNumber}
                        {indicator === indicators[12] && (
                          <> ({indicatorInfo[`measurement_${language}`]})</>
                        )}
                      </p>
                    </>
                  )}
                  {regionMaleNumber && (
                    <p>
                      <span style={{ fontWeight: 900 }}>
                        {language === "en" ? "Male" : "მამაკაცი"}
                      </span>
                      : {regionMaleNumber}
                      {indicator === indicators[12] && (
                        <> ({indicatorInfo[`measurement_${language}`]})</>
                      )}
                    </p>
                  )}
                </Popup>
              </GeoJSON>
            );
          })}

        {munData &&
          indicatorYear > 2013 &&
          zoomLevel > 8 &&
          municipalities.features.map((el) => {
            const municipality = munData.find(
              (mun) => mun.municipal_ === el.properties.MUNICIPAL1,
            );

            const munNumber =
              municipality?.value ??
              municipality?.[`w_${indicatorYear}`] ??
              "N/A";

            const munColor = checkNumberRange(munNumber, indicatorInfo);

            return (
              <GeoJSON
                ref={(geoJsonRef) => {
                  const id = el.properties.MUNICIPAL1;
                  if (geoJsonRef) {
                    munRefs.current[id] = geoJsonRef;
                  }
                  if (
                    Object.keys(munRefs.current).length ===
                    municipalities.features.length
                  ) {
                    setMunsReady(true);
                  }
                }}
                key={el.properties.NAME_GE}
                data={el}
                style={getStyle(el, zoomLevel, "municipality", munColor)}>
                <Popup>
                  <p className="popup-para">
                    {language === "ge"
                      ? el.properties.NAME_SYLFA
                      : el.properties.NAME_EN}
                  </p>
                  <p className="popup-para">{indicator}</p>
                  <p>
                    {typeof munNumber === "number"
                      ? munNumber.toFixed(1)
                      : munNumber}{" "}
                    {indicatorInfo[`measurement_${language}`]}
                  </p>
                </Popup>
              </GeoJSON>
            );
          })}
        <MapEventsHandler setZoomLevel={setZoomLevel} />
      </MapContainer>
    </>
  );
};

export default MapComponent;
