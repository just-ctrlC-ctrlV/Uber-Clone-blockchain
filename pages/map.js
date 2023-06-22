import React from "react";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const mapStyle = { map: "w-full h-full " };

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function Map() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/map-boi69/clc58ayqm004214mm97tg629s",
      center: [-74.5, 40],
      zoom: 3,
    });
  }, []);

  return <div className={mapStyle.map} id="map" />;
}

export default Map;
