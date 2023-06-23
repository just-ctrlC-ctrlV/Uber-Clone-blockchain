import { useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { UberContext } from "../context/UberContext";

const style = {
  wrapper: `flex-1 h-full w-full`,
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
  const { picklatlng, droplatlng } = useContext(UberContext);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [-99.29011, 39.39172],
      zoom: 3,
    });

    if (picklatlng) {
      addToMap(map, picklatlng);
    }

    if (droplatlng) {
      addToMap(map, droplatlng);
    }

    // if (picklatlng && droplatlng) {
    //   map.fitBounds([droplatlng, picklatlng], {
    //     padding: 400,
    //   });
    // }
  }, [picklatlng, droplatlng]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker()
      .setLngLat({ lat: 0, lng: 0 })
      .addTo(map);
  };

  return <div className={style.wrapper} id="map" />;
};

export default Map;
