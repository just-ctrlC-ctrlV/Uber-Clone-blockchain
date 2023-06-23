import Map, { Marker, NavigationControl } from "react-map-gl";
import { UberContext } from "@/context/UberContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useContext } from "react";

const accessToken =
  "pk.eyJ1IjoibWFwLWJvaTY5IiwiYSI6ImNsYzF5OWhiNTNxZzEzcGtlZ2g4OTAxM3MifQ.CqZQLqoP6bO5UkLZoTzQhQ";

const Maap = () => {
  const [markers, setmarkers] = useState([]);
  const [viewState, setViewState] = useState(false);

  const { picklatlng, droplatlng } = useContext(UberContext);
  useEffect(() => {
    if (picklatlng[0] && droplatlng[0]) {
      setmarkers([]);
      setmarkers([
        {
          id: 1,
          latitude: picklatlng[1],
          longitude: picklatlng[0],
        },
        {
          id: 2,
          latitude: droplatlng[1],
          longitude: droplatlng[0],
        },
      ]);
      setViewState(true);
    }
  }, [picklatlng, droplatlng]);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      interactive={true}
      style={{
        width: "100%",
        height: "100%",
      }}
      maxZoom={17}
      minZoom={1.2}
      initialViewState={{
        latitude: 0,
        longitude: 0,
        zoom: 5,
      }}
      viewState={
        viewState && {
          latitude: (markers[0]?.latitude + markers[1]?.latitude) / 2,
          longitude: (markers[0]?.longitude + markers[1]?.longitude) / 2,
          zoom: 8,
          padding: 400,
        }
      }
      onMoveStart={() => setViewState(false)}
      mapStyle="mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph">
      {markers?.map((marker) => {
        return (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}></Marker>
        );
      })}
      <NavigationControl />
    </Map>
  );
};

export default Maap;
