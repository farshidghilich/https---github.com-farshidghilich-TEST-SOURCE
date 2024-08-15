"use client";  
import { useEffect, useRef, useState } from "react";  
import L from "leaflet";  
import "leaflet/dist/leaflet.css";  
import markerIcon from "@/public/images/all-img/marker.png";  

// Define the position state type  
interface Position {  
  latitude: number;  
  longitude: number;  
}  

interface LeafletMapProps {  
  initialPosition?: Position; // Allow initial position to be passed as a prop  
  setItem?: any;  
  latName?: string;  
  longName?: string;  
}  

const ProMap: React.FC<LeafletMapProps> = ({  
  initialPosition,  
  latName,  
  longName,  
}) => {  
  const mapRef = useRef<HTMLDivElement | null>(null);  
  const [origin, setOrigin] = useState<Position | null>(null);  
  const [item , setItem] = useState()
  const [destination, setDestination] = useState<Position | null>(null);  
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
    mapInstance.on("click", (event: any) => {  
      const { lat, lng } = event.latlng; // Get latitude and longitude from the event  

      // If origin is not set, set it  
      if (!origin) {  
        setOrigin({ latitude: lat, longitude: lng }); // Update origin state  
        L.marker([lat, lng])  
          .addTo(mapInstance)  
          .setIcon(  
            L.icon({  
              iconUrl: markerIcon.src,  
              iconSize: [32, 32],  
              iconAnchor: [16, 32],  
              popupAnchor: [0, -32],  
            })  
          )  
          .bindPopup("Origin")  
          .openPopup();  
        
        setItem((prev: any) => ({  
          ...prev,  
          [latName as string]: lat,  
          [longName as string]: lng,  
        }));  
      }   
      // If origin is already set, set destination  
      else if (!destination) {  
        setDestination({ latitude: lat, longitude: lng }); // Update destination state  
        L.marker([lat, lng])  
          .addTo(mapInstance)  
          .setIcon(  
            L.icon({  
              iconUrl: markerIcon.src,  
              iconSize: [32, 32],  
              iconAnchor: [16, 32],  
              popupAnchor: [0, -32],  
            })  
          )  
          .bindPopup("Destination")  
          .openPopup();  
        
        setItem((prev: any) => ({  
          ...prev,  
          [`${latName}_destination`]: lat,  
          [`${longName}_destination`]: lng,  
        }));  
      }   
      // If both origin and destination are set, alert the user  
      else {  
        alert("Both origin and destination are already set. Please clear them first if you want to set new ones.");  
      }  
    });  

    setMap(mapInstance); // Store the map instance  

    return () => {  
      mapInstance.off(); // Clean up event listeners on unmount  
      mapInstance.remove();  
    };  
  }, [initialPosition, latName, longName, setItem, origin, destination]);  

  // Clear markers when position state changes  
  useEffect(() => {  
    if (map) {  
      // Clear existing markers  
      map.eachLayer((layer) => {  
        if (layer instanceof L.Marker) {  
          map.removeLayer(layer);  
        }  
      });  

      // Add new marker for origin if it exists  
      if (origin) {  
        L.marker([origin.latitude, origin.longitude])  
          .addTo(map)  
          .setIcon(L.icon({  
            iconUrl: markerIcon.src,  
            iconSize: [32, 32],  
            iconAnchor: [16, 32],  
            popupAnchor: [0, -32],  
          }))  
          .bindPopup("Origin")  
          .openPopup();  
      }  

      // Add new marker for destination if it exists  
      if (destination) {  
        L.marker([destination.latitude, destination.longitude])  
          .addTo(map)  
          .setIcon(L.icon({  
            iconUrl: markerIcon.src,  
            iconSize: [32, 32],  
            iconAnchor: [16, 32],  
            popupAnchor: [0, -32],  
          }))  
          .bindPopup("Destination")  
          .openPopup();  
      }  
    }  
  }, [origin, destination, map]);  

  return (  
    <>  
      {(!origin || !destination) && <div>جی پی اس خود را بررسی کنید.</div>}  
      <div  
        id="map"  
        style={{ height: "200px", borderRadius: "20px" }}  
        ref={mapRef}  
      ></div>  
    </>  
  );  
};  

export default ProMap;