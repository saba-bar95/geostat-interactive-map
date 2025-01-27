import { useMapEvents } from "react-leaflet";
import PropTypes from "prop-types";

const MapEventsHandler = ({ setZoomLevel }) => {
  const map = useMapEvents({
    zoomend: () => {
      setZoomLevel(map.getZoom());
    },
  });

  return null;
};

MapEventsHandler.propTypes = {
  setZoomLevel: PropTypes.func.isRequired,
};

export default MapEventsHandler;
