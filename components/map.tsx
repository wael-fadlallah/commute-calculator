import { useState, useMemo, useCallback, useRef, Ref } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 25.187655, lng: 55.264528 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      mapId: 'd33ad7bc60829d6d',
    }),
    []
  );

  const onLoad = useCallback((map: any) => mapRef.current = map, []);
  return (
    <div className="container">
      <div className="controls">
        <h1>commute?</h1>

        <Places setOffice={(position) => {
          setOffice(position);
          mapRef.current?.panTo(position);
        }} />
      </div>
      <div className="map">
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerClassName={"map-container"}
          options={options}
          onLoad={onLoad}
        >
          {office && <Marker position={office} icon={'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'} />}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
