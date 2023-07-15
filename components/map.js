import { useEffect, useState, useContext } from "react";
import Map, { Marker, NavigationControl, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { UberContext } from "@/context/UberContext";
import mapmarker from "../assets/marker.svg";

const Maap = () => {
  const [markers, setmarkers] = useState([]);
  const [viewState, setViewState] = useState(false);

  const useUber = useContext(UberContext);

  useEffect(() => {
    if (useUber?.picklatlng[0] != 0 && useUber?.droplatlng[0] != 0) {
      setmarkers([]);
      setmarkers([
        {
          id: 1,
          latitude: useUber?.picklatlng[1],
          longitude: useUber?.picklatlng[0],
        },
        {
          id: 2,
          latitude: useUber?.droplatlng[1],
          longitude: useUber?.droplatlng[0],
        },
      ]);
    }
    setViewState(true);
  }, [useUber?.picklatlng, useUber?.droplatlng, useUber?.currentUser]);

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
        latitude: 12.9716,
        longitude: 77.5946,
        zoom: 9,
      }}
      viewState={
        viewState && {
          latitude: markers[0]
            ? (markers[0]?.latitude + markers[1]?.latitude) / 2
            : useUber?.picklatlng[1],
          longitude: markers[0]
            ? (markers[0]?.longitude + markers[1]?.longitude) / 2
            : useUber?.picklatlng[0],
          zoom: 8,
          padding: 400,
        }
      }
      onMoveStart={() => setViewState(false)}
      mapStyle={process.env.NEXT_PUBLIC_MAP_STYLE}>
      {markers?.map((marker) => {
        return (
          <Marker
            key={marker?.id}
            latitude={marker?.latitude}
            longitude={marker?.longitude}>
            <div className="">
              <Image src={mapmarker} alt="marker" className="w-12 h-12" />
            </div>
          </Marker>
        );
      })}
      <NavigationControl />
      {/* <Layer
        id="lineLayer"
        type="line"
        source={{
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [80.3319, 26.4499],
                [80.9462, 26.8467],
              ],
            },
          },
        }}
        paint={{
          "line-color": "#ff0000",
          "line-width": 4,
        }}
      /> */}
    </Map>
  );
};

export default Maap;
