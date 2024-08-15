"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "@/public/images/all-img/marker.png";
// Define the position state type
interface Position {
  latitude: any;
  longitude: any;
}

interface LeafletMapProps {
  initialPosition?: Position; // Allow initial position to be passed as a prop
  setItem: any;
  latName?: string;
  longName?: string;
}

const InputMap: React.FC<LeafletMapProps> = ({
  initialPosition,
  setItem,
  latName,
  longName,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(
    initialPosition?.latitude
      ? initialPosition
      : { latitude: 35.699444, longitude: 51.337776 }
  );
  const [map, setMap] = useState<L.Map | null>(null); // Keep a reference to the map instance

  useEffect(() => {
    // Initialize the map
    const mapInstance = L.map(mapRef.current!).setView(
      initialPosition?.latitude && initialPosition?.longitude
        ? [initialPosition.latitude, initialPosition.longitude]
        : [35.699444, 51.337776],
      13
    );

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        id: "mapbox/streets-v11",
        accessToken:
          "sk.eyJ1IjoiYWxpNzg4N2FsYWVpIiwiYSI6ImNseTJpeWZuMzE4YWYyaXE3MjhlYmR6dzUifQ.wcXIB91NgGsSBQBNrGyLKQ",
      }
    ).addTo(mapInstance);

    // Handle user clicks on the map
    mapInstance.on("click", (event:any) => {
      const { lat, lng } = event.latlng; // Get latitude and longitude from the event
      setPosition({ latitude: lat, longitude: lng }); // Update position state
      setItem((prev: any) => ({
        ...prev,
        [latName as string]: lat,
        [longName as string]: lng,
      }));
      L.marker([lat, lng])
        .addTo(mapInstance)
        .setIcon(
          L.icon({
            iconUrl: markerIcon.src,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          })
        );
    });

    setMap(mapInstance); // Store the map instance

    return () => {
      mapInstance.off(); // Clean up event listeners on unmount
      mapInstance.remove();
    };
  }, []);

  // Update the map when the position changes
  useEffect(() => {
    if (map && position) {
      map.setView([position.latitude, position.longitude], 13); // Center the map on the new position
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
      // Add new marker at the updated position
      L.marker([position.latitude, position.longitude])
        .addTo(map)
        .setIcon(
          L.icon({
            iconUrl: markerIcon.src,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          })
        );
    }
  }, [position, map]);

  return (
    <>
      {!position && <div>جی پی اس خود را بررسی کنید.</div>}
      <div
        id="map"
        style={{ height: "200px", borderRadius: "20px" }}
        ref={mapRef}
      ></div>
    </>
  );
};

export default InputMap;
