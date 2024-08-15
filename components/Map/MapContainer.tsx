import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

// Ensure that you have your Mapbox access token set
mapboxgl.accessToken =
  "sk.eyJ1IjoiYWxpNzg4N2FsYWVpIiwiYSI6ImNseTJpeWZuMzE4YWYyaXE3MjhlYmR6dzUifQ.wcXIB91NgGsSBQBNrGyLKQ";

const MapContainer: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [lng, setLng] = useState<number>(5);
  const [lat, setLat] = useState<number>(34);
  const [zoom, setZoom] = useState<number>(1.5);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.on("move", () => {
        setLng(Number(map.getCenter().lng.toFixed(4)));
        setLat(Number(map.getCenter().lat.toFixed(4)));
        setZoom(Number(map.getZoom().toFixed(2)));
      });

      // Clean up on unmount
      return () => map.remove();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
      <div>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </div>
  );
};

export default MapContainer;
